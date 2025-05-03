import React from "react";
import Home from "./Home";
import ServiceDasborad from "./ServiceDashboard";
import AdminDashboard from "./AdminDashboard";

const HomeOrLogin = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("accessToken");

  if (isAuthenticated) {
    if (token && userType === "DEPARTMENT_MANAGER") {
      return <Home />;
    } else {
      return <ServiceDasborad />;
    }
  }
  
  return <Home />;
};

export default HomeOrLogin;
