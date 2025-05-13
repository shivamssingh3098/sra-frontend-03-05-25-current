import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import userFormImage from "../images/Pankaj.png"; // Make sure to add this image to your assets

const UserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    taluka: "",
    district: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        {/* Basic Info Section */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold bg-blue-50 p-3 rounded-md text-blue-800">
                मूलभूत माहिती (Basic Info)
              </h2>
            </div>
            <div className="flex-shrink-0">
              <img
                src={userFormImage}
                alt="Registration"
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> पूर्ण नाव
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> मोबाइल न.
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Taluka */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> तालुका
              </label>
              <select
                name="taluka"
                value={formData.taluka}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">-निवडा-</option>
                <option value="taluka1">Taluka 1</option>
                <option value="taluka2">Taluka 2</option>
              </select>
            </div>

            {/* District */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> जिल्हा
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                required
              >
                <option value="">-निवडा-</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="nagpur">Nagpur</option>
              </select>
            </div>

            {/* Address */}
            <div className="form-group md:col-span-2">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> पत्ता
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 bg-blue-50 p-3 rounded-md text-blue-800">
            वेरीफिकेशन (Verification)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> EMAIL ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 relative overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-gray-500 text-sm">
                        Upload Photo
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </div>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium">
                <span className="text-red-500">*</span> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
