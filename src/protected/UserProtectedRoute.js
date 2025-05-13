import React from "react";
import { Navigate } from "react-router-dom";

export const UserProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const token = localStorage.getItem("accessToken");
  let userType = localStorage.getItem("userType");
  userType = userType?.replace(/"/g, "").trim();
  // console.log("userType", userType);
  console.log("userType in user protected route", userType);

  if (!isAuthenticated || !token || userType !== "USER") {
    return <Navigate to="/" replace />;
  }

  return children;
};
