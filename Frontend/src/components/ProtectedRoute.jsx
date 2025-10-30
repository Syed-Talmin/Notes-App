import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "../api/axios";

export default function ProtectedRoute() {
  const { isAuthenticated, user, setUser, setToken } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
         return <Navigate to="/login" replace />;
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]); // runs when 'user' changes

  if (!user) return <p>Loading...</p>;

  return <Outlet />;
}
