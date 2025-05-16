import React, { useState } from "react";
import { FaSync, FaUser, FaKey, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CONFIG from "../app.config"; // adjust path as needed

const OfficerLogin = ({ onSwitchToUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  const [captchaText, setCaptchaText] = useState("ABC123");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.captcha !== captchaText) {
      setMessageType("error");
      setMessage("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch(
        CONFIG.API_BASE_URL + "/api/v1/department-managers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (
        data.success
        // response.ok &&
        // data.data?.departmentManager?.userType === "DEPARTMENT_MANAGER"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        // localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("userType", data.data.departmentManager.userType);
        localStorage.setItem("UserId", data.data.departmentManager._id);
        localStorage.setItem("userName", data.data.departmentManager.userName);
        localStorage.setItem("fullName", data.data.departmentManager.fullName);
        localStorage.setItem(
          "department",
          data.data.departmentManager.department
        );

        const userType = localStorage.getItem("userType");
        console.log("user type is on login ", userType);
        setMessageType("success");
        setMessage("Login successful!");
        // window.location.reload();
        // setTimeout(() => {
        navigate("/admin");
        // }, 1000);
        window.location.reload();
      } else {
        setMessageType("error");
        setMessage(data.message || "Login failed.");
        generateCaptcha();
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessageType("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="officer-login-container animate-fade-in">
      <h2>
        <FaUser /> LOG IN / REGISTER
      </h2>

      <div className="officer-login-tabs">
        <button
          type="button"
          className="officer-register-btn"
          onClick={onSwitchToUser}
        >
          <FaUserPlus /> USER LOGIN
        </button>
        <button className="officer-login-btn">
          <FaSignInAlt /> OFFICER LOGIN
        </button>
      </div>

      <div className="login-form">
        <h3>
          <MdLock /> Already Registered? Login Here
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="officer-form-group">
            <label>
              <FaUser /> Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div style={{ position: "relative" }} className="officer-form-group">
            <label>
              <FaKey /> Password
            </label>
            <input
              // type="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "70%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <div className="officer-captcha-section">
            <div className="captcha-instruction ">
              <b>Enter the captcha shown below</b>
            </div>
            <input
              type="text"
              name="captcha"
              value={formData.captcha}
              onChange={handleInputChange}
              placeholder="Enter captcha"
              className="captcha-input"
              required
            />
            <div className="officer-captcha-box">
              <button
                type="button"
                className="officer-reload-btn"
                onClick={generateCaptcha}
                title="Click to reload captcha"
              >
                <FaSync />
              </button>
              <div className="officer-captcha-text">{captchaText}</div>
            </div>
          </div>

          {/* <div className="officer-forgot-links">
            <a href="#forgot-password">
              <FaKey /> Forgot Password
            </a>
            <a href="#forgot-username">
              <FaUser /> Forgot Username
            </a>
          </div> */}

          {message && (
            <div className={`form-message ${messageType}`}>{message}</div>
          )}

          <button type="submit" className="officer-submit-btn">
            <FaSignInAlt /> Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;
