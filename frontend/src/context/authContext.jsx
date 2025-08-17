import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // Loading state

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  return (
    <AuthContext.Provider value={{ backendUrl, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
