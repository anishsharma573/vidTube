import React, { useState } from "react";
import axiosInstance from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostComment = ({ videoId, onCommentPosted }) => {
    const [comment, setComment] = useState('');

    const handlePostComment = async () => {
        if (!comment.trim()) {
            toast.error("Comment cannot be empty!");
            return;
        }
        try {
            const response = await axiosInstance.post(`/comment/addcomments/${videoId}`, { content: comment });

            toast.success("Comment posted successfully!");
            setComment(''); // Clear input

            if (onCommentPosted) {
                onCommentPosted(response.data.data); // Update comment list in parent component
            }
        } catch (error) {
            console.error("❌ Error posting comment:", error.response?.data || error.message);
            toast.error("Failed to post comment. Please try again.");
        }
    };

    return (
        <div className="mt-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <input
                type="text"
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 rounded w-full"
            />
            <button 
                onClick={handlePostComment} 
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Post Comment
            </button>
        </div>
    );
};

export default PostComment;
