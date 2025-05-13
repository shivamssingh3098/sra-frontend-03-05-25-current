import React from "react";
import { DiW3C } from "react-icons/di";
import { Navigate } from "react-router-dom";

const DepartmentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  console.log("user type in department protect router", userType);

  if (!token || (userType !== "DEPARTMENT_MANAGER" && userType !== "ADMIN")) {
    console.log("userType return", userType);

    return <Navigate to="/" />;
  }

  return children;
};

export default DepartmentProtectedRoute;
