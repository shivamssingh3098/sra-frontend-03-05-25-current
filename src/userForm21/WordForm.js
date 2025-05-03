import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";

const WardForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-4 w-full">
      <label className="font-medium block mb-2 text-sm md:text-base">
        सेक्टर क्र./वॉर्ड क्र <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="wardType"
            value="सेक्टर क्र"
            checked={formData.wardType === "सेक्टर क्र"}
            onChange={handleChange}
          />
          सेक्टर क्र
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="wardType"
            value="वॉर्ड क्र"
            checked={formData.wardType === "वॉर्ड क्र"}
            onChange={handleChange}
          />
          वॉर्ड क्र
        </label>
      </div>

      <input
        type="text"
        name="wardNo"
        value={formData.wardNo}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm md:text-base"
        placeholder="क्रमांक टाका"
        required
      />
    </div>
  );
};

export default WardForm;
