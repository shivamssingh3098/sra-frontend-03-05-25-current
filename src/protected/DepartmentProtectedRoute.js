import React from "react";
import { DiW3C } from "react-icons/di";
import { Navigate } from "react-router-dom";

const DepartmentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  if (!token || userType !== "DEPARTMENT_MANAGER") {
    return <Navigate to="/" />;
  }

  return children;
};

export default DepartmentProtectedRoute;
