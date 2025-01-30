import { useState, useEffect } from "react";
import axiosInstance from "../services/api";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/current-user");
        setUser(response.data.data); // Assuming user details are in `response.data.data`
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
