import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/users/logout");
      console.log("API Response Full:", response);
      console.log("API Response Status:", response.status);
      console.log("API Response Data:", response.data);

      if (response.status === 200 && response.data?.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login", { replace: true });
      } else {
        console.error("Unexpected API Response:", response.data);
        alert(response.data?.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>
  );
};

export default Logout;
