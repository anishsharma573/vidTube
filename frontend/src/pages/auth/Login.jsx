import React, { useState } from "react";
import axiosInstance from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    email: formData.email,
    password: formData.password,
    username: formData.username,
  };

  try {
    const response = await axiosInstance.post("/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { accessToken, refreshToken } = response.data.data;

    // Log tokens to verify they are present
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    if (accessToken && refreshToken) {
      // Save tokens to localStorage
      localStorage.setItem("token", accessToken);
      console.log("Token saved in localStorage:", localStorage.getItem("token"));

      localStorage.setItem("refreshToken", refreshToken);
      console.log("Refresh Token saved in localStorage:", localStorage.getItem("refreshToken"));
 console.log(response)
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      console.error("Tokens not found in the response data:", response.data);
      alert("Login failed: Tokens not received.");
    }
  } catch (error) {
    console.error(
      "Error during login:",
      JSON.stringify(error.response?.data || error.message, null, 2)
    );
    alert(`Login failed! ${error.response?.data?.message || "Unknown error"}`);
  }
};

  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    // TODO: also login using email and password   only by username is done

  const fields = [
    { name: "username", type: "text", placeholder: "Username", required: true },
   
    { name: "password", type: "password", placeholder: "Password", required: true },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-lg overflow-hidden bg-white">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Log in to Your Account
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
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 px-4 py-2 text-sm sm:text-base"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <a href="/" className="text-gray-700 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src=" https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
