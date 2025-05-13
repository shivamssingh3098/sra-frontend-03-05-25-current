// import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Captcha from "./Captcha";
import { FaUser, FaKey, FaSignInAlt } from "react-icons/fa";
import CONFIG from "../app.config"; // adjust path as needed

const UserLoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [actualCaptcha, setActualCaptcha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptchaChange = (value) => {
    setActualCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (captchaInput !== actualCaptcha) {
      setError("Captcha does not match");
      setIsLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        CONFIG.API_BASE_URL + "/api/v1/users/login",
        {
          email: userId,
          password: password,
        },
        config
      );

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.data.user)
        );

        localStorage.setItem(
          "userType",
          JSON.stringify(response.data.data.user.userType)
        );
        const userType = localStorage.getItem("userType");
        console.log("user type is on login ", userType);

        // 🔁 Redirect to protected page
        navigate("/", { replace: true });

        window.location.reload();
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        {/* Login Fields */}
        <div>
          <label className="flex items-center gap-2">
            <FaUser className="text-blue-600 " /> User E-MAIL
          </label>
          <input
            type="email"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <FaKey className="text-blue-600" /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Enter captcha value"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
        <Captcha onChange={handleCaptchaChange} />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isLoading ? (
            <div
              style={{
                border: "3px solid rgba(255, 255, 255, 0.3)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            <>
              <FaSignInAlt /> Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
