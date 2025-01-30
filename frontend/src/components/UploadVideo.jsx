import React, { useState, useRef } from "react";
import ReactDOM from "react-dom"; // ✅ Used for Modal Portal
import axiosInstance from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  // Handle Video Selection
  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setIsModalOpen(true); // ✅ Open modal after selecting a file
    }
  };

  // Handle Thumbnail Selection
  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Trigger File Inputs
  const triggerVideoInput = () => videoInputRef.current.click();
  const triggerThumbnailInput = () => thumbnailInputRef.current.click();

  // Upload Video
  const uploadVideo = async () => {
    if (!videoFile || !title || !thumbnailFile) {
      toast.error("Please select a video, a thumbnail, and enter a title.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axiosInstance.post("/video/publish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Video uploaded successfully!");

      // Reset state after upload
      setVideoFile(null);
      setThumbnailFile(null);
      setPreviewURL(null);
      setThumbnailPreview(null);
      setTitle("");
      setDescription("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to upload video.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Hidden File Inputs */}
      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        onChange={handleVideoSelect}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={thumbnailInputRef}
        onChange={handleThumbnailSelect}
        className="hidden"
      />

      {/* Upload Button (Navbar) */}
      <button
        onClick={triggerVideoInput}
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition text-sm"
      >
        Upload Video
      </button>

      {/* Modal - Placed Outside Navbar Using React Portal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upload Video</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Video Preview */}
              <div className="mb-4">
                {previewURL && (
                  <video controls className="w-full rounded-lg">
                    <source src={previewURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Thumbnail Selection & Preview */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                <button
                  onClick={triggerThumbnailInput}
                  className="w-full bg-gray-300 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Select Thumbnail
                </button>
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="mt-2 w-full h-32 object-cover rounded-md"
                  />
                )}
              </div>

              {/* Video Title Input */}
              <input
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
                required
              />

              {/* Video Description Input */}
              <textarea
                placeholder="Enter video description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />

              {/* Upload Button with Loading */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={uploadVideo}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>,
          document.body // ✅ Placed outside navbar using portal
        )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default UploadVideo;
