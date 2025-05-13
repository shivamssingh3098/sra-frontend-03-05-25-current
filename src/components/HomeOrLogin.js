import React from "react";
import Home from "./Home";
import ServiceDasborad from "./ServiceDashboard";
import AdminDashboard from "./AdminDashboard";
import UserServices from "./userServicesListComp/UserServices";

const HomeOrLogin = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userType = localStorage.getItem("userType");
  const token = localStorage.getItem("accessToken");

  if (isAuthenticated) {
    if (token && (userType === "DEPARTMENT_MANAGER" || userType === "ADMIN")) {
      return <AdminDashboard />;
    } else {
      // return <ServiceDasborad />;
      return <UserServices />;
    }
  }

  return <Home />;
};

export default HomeOrLogin;
