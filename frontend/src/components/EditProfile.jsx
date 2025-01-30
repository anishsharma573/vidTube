import React, { useState } from "react";
import axiosInstance from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState({
    fullName: false,
    email: false,
    bio: false,
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Individual Updates
  const handleUpdate = async (field) => {
    if (!formData[field]) {
      toast.error(`Please enter a valid ${field}!`);
      return;
    }

    setLoading({ ...loading, [field]: true });

    try {
      await axiosInstance.put("/users/update-account", { [field]: formData[field] });

      toast.success(`${field} updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update ${field}!`);
    } finally {
      setLoading({ ...loading, [field]: false });
    }
  };

  // Update Avatar
  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("avatar", formData.avatar);

      await axiosInstance.post("/users/update-avatar", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error("Failed to update avatar!");
    }
  };

  // Update Cover Image
  const handleUpdateCoverImage = async (e) => {
    e.preventDefault();
    if (!formData.coverImage) {
      toast.error("Please select a cover image to upload.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("coverImage", formData.coverImage);

      await axiosInstance.post("/users/update-cover-image", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Cover image updated successfully!");
    } catch (error) {
      toast.error("Failed to update cover image!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-indigo-50">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Edit Profile</h2>

        {/* Update Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter new name"
              className="w-full p-3 border rounded-md"
            />
            <button
              onClick={() => handleUpdate("fullName")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading.fullName}
            >
              {loading.fullName ? "changing..." : "update name"}
            </button>
          </div>
        </div>

        {/* Update Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter new email"
              className="w-full p-3 border rounded-md"
            />
            <button
              onClick={() => handleUpdate("email")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              disabled={loading.email}
            >
              {loading.email ? "changing..." : "update email"}
            </button>
          </div>
        </div>

        {/* Update Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Enter new bio"
              className="w-full p-3 border rounded-md"
            />
            <button
              onClick={() => handleUpdate("bio")}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              disabled={loading.bio}
            >
              {loading.bio ? "changing..." : "update Bio"}
            </button>
          </div>
        </div>

        {/* Update Avatar */}
        <form onSubmit={handleUpdateAvatar} className="mt-8">
          <label className="block text-sm font-medium text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
          />
          <button
            type="submit"
            className="w-full mt-3 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Update Avatar
          </button>
        </form>

        {/* Update Cover Image */}
        <form onSubmit={handleUpdateCoverImage} className="mt-8">
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md"
          />
          <button
            type="submit"
            className="w-full mt-3 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Update Cover Image
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditProfile;
