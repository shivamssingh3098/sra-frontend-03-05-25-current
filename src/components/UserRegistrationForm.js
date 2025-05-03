import React, { useState } from "react";
import axios from "axios";
import "./UserRegistrationForm.css";
import CONFIG from "../app.config"; // adjust path as needed

const UserRegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    phone: "",
    state: "",
    city: "",
    pinCode: "",
    address: "",
    taluk: "",
    village: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "userName",
      "fullName",
      "phone",
      "state",
      "city",
      "pinCode",
      "address",
      "taluk",
      "village",
      "email",
      "password",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Pin code validation
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pin code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector(".error-message");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      const res = await axios.post(
        CONFIG.API_BASE_URL + "/api/v1/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        // Reset form after successful submission
        setFormData({
          userName: "",
          fullName: "",
          phone: "",
          state: "",
          city: "",
          pinCode: "",
          address: "",
          taluk: "",
          village: "",
          email: "",
          password: "",
        });
        setProfileImage(null);
        setImagePreview(null);
        setErrors({});
        alert("Registration successful! Please login.");
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="user-registration-container">
      <form onSubmit={handleSubmit}>
        <div className="basic-info-section">
          <div className="section-header">
            <h2 className="section-title">मूलभूत माहिती (Basic Info)</h2>
          </div>
          <div className="form-content">
            <div className="form-with-profile">
              <div className="main-form-grid">
                <div className="form-group">
                  <label className="form-label required">Username</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`form-input ${errors.userName ? "error" : ""}`}
                    required
                  />
                  {errors.userName && (
                    <span className="error-message">{errors.userName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? "error" : ""}`}
                    required
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    required
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">District</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`form-input ${errors.state ? "error" : ""}`}
                    required
                  />
                  {errors.state && (
                    <span className="error-message">{errors.state}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-input ${errors.city ? "error" : ""}`}
                    required
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className={`form-input ${errors.pinCode ? "error" : ""}`}
                    required
                  />
                  {errors.pinCode && (
                    <span className="error-message">{errors.pinCode}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${errors.address ? "error" : ""}`}
                    required
                  />
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Taluka</label>
                  <input
                    type="text"
                    name="taluk"
                    value={formData.taluk}
                    onChange={handleChange}
                    className={`form-input ${errors.taluk ? "error" : ""}`}
                    required
                  />
                  {errors.taluk && (
                    <span className="error-message">{errors.taluk}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required">Village</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    className={`form-input ${errors.village ? "error" : ""}`}
                    required
                  />
                  {errors.village && (
                    <span className="error-message">{errors.village}</span>
                  )}
                </div>
              </div>
              <div className="profile-section">
                <div className="profile-preview">
                  <label
                    htmlFor="profile-image"
                    className="profile-image-container"
                    style={{ cursor: "pointer" }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>
                        <b>CLICK HERE TO ADD PROFILE PHOTO</b>
                      </span>
                    )}
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>

            <div className="auth-fields">
              <div className="form-group">
                <label className="form-label required">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label className="form-label required">Password</label>
                <div
                  className="password-input-container"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default UserRegisterForm;
