import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import VideoGrid from "./pages/Dashboard";
import Navbar from "./components/forms/Navbar";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/EditProfile";
import WatchVideo from "./components/WatchVideo";
const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// Component for Layout Management
const MainLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
    <ToastContainer />
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<VideoGrid />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="/profile/edit-profile" element={<EditProfile />} />
        <Route path="/watch/:videoId" element={<WatchVideo />} />
      </Routes>
    </>
  );
};

export default App;
