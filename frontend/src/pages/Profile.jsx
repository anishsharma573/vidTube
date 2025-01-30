import React from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../components/CurrentUser";

const Profile = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Image Section */}
      <div className="relative w-full h-52 bg-gray-300">
        {user?.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-6">
        {/* Avatar Section */}
        <div className="relative flex items-center">
          <div className="absolute -top-12 left-6">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="ml-32 mt-6">
            <h2 className="text-2xl font-semibold">{user?.fullName || "User Name"}</h2>
            <p className="text-gray-600">@{user?.username}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end mt-6 gap-4">
          <Link to="/profile/edit-profile">
            <button className="bg-gray-200 text-black py-2 px-4 rounded-full hover:bg-gray-300 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/profile/change-password">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Change Password
            </button>
          </Link>
        </div>

        {/* User Details Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600">
            {user?.bio || "No bio available. Update your profile to add details."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
