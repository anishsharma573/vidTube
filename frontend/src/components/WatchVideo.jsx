import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../services/api";
import ToggleLike from "./Like/ToggleLike";
import Comment from "./comment/Comment";

const WatchVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log("🔍 Requesting videoId:", videoId);
        const response = await axiosInstance.get(`/video/${videoId}`);
        console.log("✅ Fetched Video Data:", response.data);

        if (response.data && response.data.data) {
          setVideo(response.data.data);
        } else {
          console.log("❌ Video data is missing from response");
        }
      } catch (error) {
        console.error("❌ Error fetching video:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axiosInstance.get("/video?page=1&limit=8");
        setRelatedVideos(response.data.data.videos.filter(v => v._id !== videoId));
      } catch (error) {
        console.error("❌ Error fetching related videos:", error.message);
      }
    };

    fetchVideo();
    fetchRelatedVideos();
  }, [videoId]);

  if (loading) return <p className="text-center text-gray-500">Loading video...</p>;
  if (!video || Object.keys(video).length === 0) return <p className="text-center text-red-500">❌ Video not found.</p>;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4">
      {/* Main Video Section */}
      <div className="lg:w-2/3 w-full">
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
          <video controls className="w-full h-full">
            <source src={video.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Title & Info */}
        <div className="flex justify-between items-start mt-4">
          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <p className="text-gray-500">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
            <p className="mt-2 text-gray-700">{video.description}</p>
          </div>
          <ToggleLike videoId={videoId} />
        </div>

        {/* Video Owner */}
        <div className="mt-6 flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
          <img src={video.owner?.avatar || "https://via.placeholder.com/50"} alt={video.owner?.username} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold text-lg">{video.owner?.username || "Unknown User"}</p>
            <p className="text-sm text-gray-500">Uploaded on {new Date(video.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <Comment videoId={videoId} />
        </div>
      </div>

      {/* Sidebar - Recommended Videos */}
      <div className="lg:w-1/3 w-full lg:pl-6 mt-6 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((vid) => (
            <Link to={`/watch/${vid._id}`} key={vid._id} className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
              <img src={vid.thumbnail} alt={vid.title} className="w-32 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="text-lg font-medium">{vid.title}</h3>
                <p className="text-sm text-gray-600">{vid.owner?.username || "Unknown"}</p>
                <p className="text-xs text-gray-500">{vid.views} views • {new Date(vid.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
