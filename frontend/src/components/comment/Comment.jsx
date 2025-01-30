import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";
import PostComment from "./PostComment";

const Comment = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comment/comments/${videoId}`);
        console.log("✅ Comments API Response:", response.data);

        const fetchedComments = Array.isArray(response.data.data?.comments) ? response.data.data.comments : [];
        setComments(fetchedComments);
      } catch (error) {
        console.error("❌ Error fetching comments:", error.response?.data || error.message);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className="mt-4">
      <PostComment videoId={videoId} onCommentPosted={handleNewComment} />

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow">
              <p className="font-semibold text-lg">{comment.user?.username || "Anonymous"}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
