import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../pages/auth/Logout";
import useCurrentUser from "../CurrentUser";
import UploadVideo from "../UploadVideo";

const Navbar = () => {
  const { user, loading, error } = useCurrentUser(); // Destructure user data from the hook

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <div className="text-2xl font-extrabold">
        <Link to="/dashboard" className="hover:text-indigo-400 transition duration-300">
          Logo
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-row gap-8 text-lg font-medium">
        <li>
          <Link to="/dashboard" className="hover:text-indigo-400 transition duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-indigo-400 transition duration-300">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-indigo-400 transition duration-300">
            Contact
          </Link>
        </li>
      </ul>

      {/* Profile and Logout Section */}
      <div className="flex items-center gap-6">
        {!loading && user ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            {/* Profile Icon */}
            <img
              src={user.avatar || "https://via.placeholder.com/32"}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span>{user.username || "Profile"}</span>
          </Link>
        ) : (
          <div className="text-sm text-gray-400">Loading...</div>
        )}
        <Logout />
        <UploadVideo/>
      </div>
    </nav>
  );
};

export default Navbar;
