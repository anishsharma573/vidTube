import React, { useState } from "react";
import axiosInstance from "../../services/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    avatar: null,
    fullName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("username", formData.username);
    data.append("fullName", formData.fullName);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    try {
      const response = await axiosInstance.post("/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User registered successfully:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      alert(`Registration failed! ${error.response?.data?.message || ""}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fields = [
    { name: "username", type: "text", placeholder: "Username", required: true },
    { name: "fullName", type: "text", placeholder: "Full Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "avatar", type: "file", placeholder: "Profile Image", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-lg overflow-hidden bg-white">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-600"
                >
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  onChange={handleInputChange}
                  required={field.required}
                  className={`mt-1 block w-full ${
                    field.type === "file"
                      ? "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200"
                      : "rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 px-4 py-2 text-sm sm:text-base"
                  }`}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-gray-700 hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
