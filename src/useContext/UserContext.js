import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : {};
  });
  //    when user logged out

  const logoutUser = () => {
    // Clear local storage
    // localStorage.removeItem("userData");
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("userType");
    // localStorage.removeItem("isAuthenticated");

    // Clear context state
    setUser({});
  };
  return (
    <>
      <UserContext.Provider value={{ user, setUser, logoutUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
