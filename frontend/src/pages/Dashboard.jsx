import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import { Link } from "react-router-dom";

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // ✅ Fix API endpoint (use `/videos`, not `/video`)
        const response = await axiosInstance.get("/video?page=1&limit=12");
        setVideos(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recommended Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id} className="group">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="text-md font-semibold group-hover:text-red-600">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.owner?.username}</p>
                <p className="text-sm text-gray-500">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
