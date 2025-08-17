import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // Loading state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [admin, setAdmin] = useState(null); // store logged-in admin
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/admin/logout`, {}, { withCredentials: true });
      console.log("✅ Logged out successfully");
      navigate("/"); // redirect to login page
    } catch (err) {
      console.error("❌ Logout failed", err);
    }
  };

  const checkAuth = async () => {
    try {
      await axios.get(`${backendUrl}/api/admin/check-auth`, {
        withCredentials: true
      });
      return true; // authenticated
    } catch (err) {
      return false; // not authenticated
    }
  };

  // FIXED handleLogin: now accepts loginData from component
  const handleLogin = async (formData) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/login`,
        {
          username: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setAdmin(res.data.admin); // ✅ store admin info in context
        if (formData.rememberMe) localStorage.setItem("rememberedEmail", formData.email);
        else localStorage.removeItem("rememberedEmail");

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AuthContext.Provider value={{ backendUrl, loading, setLoading, handleLogout, checkAuth, handleLogin, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
