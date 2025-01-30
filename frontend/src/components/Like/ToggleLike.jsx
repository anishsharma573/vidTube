import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
const ToggleLike = ({ videoId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // ✅ Fetch initial like status & count from backend
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axiosInstance.get(`/like/video/${videoId}`);
        console.log("🔄 Fetched Like Status:", response.data);

        // ✅ Ensure correct property access
        const isLiked = response.data?.data?.isLiked ?? false;
        const likes = response.data?.data?.likes ?? 0;

        setIsLiked(isLiked);
        setLikesCount(likes);
      } catch (error) {
        console.error("❌ Error fetching like status:", error.response?.data || error.message);
      }
    };
    fetchLikes();
  }, [videoId]);

  // ✅ Toggle Like Function
  const handleToggleLike = async () => {
    try {
      const response = await axiosInstance.post(`/like/toggleVideoLike/${videoId}`);
      console.log("✅ Like Response:", response.data);

      // ✅ Ensure correct property access
      const isLiked = response.data?.data?.isLiked ?? false;
      const likes = response.data?.data?.likes ?? 0;

      // ✅ Update UI immediately
      setIsLiked(isLiked);
      setLikesCount(likes);
    } catch (error) {
      console.error("❌ Error toggling like:", error.response?.data || error.message);
    }
  };

  return (
    <button 
      onClick={handleToggleLike} 
      className={`px-4 py-2 rounded-lg font-semibold transition ${isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}
    >
      {isLiked ? "Unlike" : "Like"} ({likesCount})
    </button>
  );
};

export default ToggleLike;
