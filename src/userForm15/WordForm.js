import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";

const WardForm = ({ formData, setFormData }) => {
  const [debugInfo, setDebugInfo] = useState("");

  // Log form data changes for debugging
  useEffect(() => {
    setDebugInfo(
      `Current wardType: ${formData.wardType || "Not selected"}, wardNo: ${
        formData.wardNo || "Not entered"
      }`
    );
    console.log("WordForm - Current form data:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("WordForm - Input change:", { name, value });

    // If changing the wardType, update the appropriate field
    if (name === "wardType") {
      console.log("WordForm - Changing wardType to:", value);

      // Clear the wardNo when changing type
      setFormData((prev) => {
        const newData = {
          ...prev,
          wardType: value,
          wardNo: "", // Clear the ward number when changing type
        };
        console.log("WordForm - Updated form data:", newData);
        return newData;
      });
    } else if (name === "wardNo") {
      // For wardNo, update it and also update the appropriate field based on wardType
      setFormData((prev) => {
        const newData = {
          ...prev,
          wardNo: value,
        };

        // Based on the selected wardType, update the appropriate field
        if (prev.wardType === "सेक्टर क्र") {
          newData.sectorNo = value;
          console.log("WordForm - Setting sectorNo:", value);
        } else if (prev.wardType === "वॉर्ड क्र") {
          // No need to set wardNo again as it's already set above
          console.log("WordForm - Setting wardNo:", value);
        }

        console.log("WordForm - Updated form data:", newData);
        return newData;
      });
    }
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
        type="number"
        name="wardNo"
        value={formData.wardNo}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm md:text-base"
        placeholder="क्रमांक टाका"
        required
      />

      {/* Debug information */}
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
        <p className="font-semibold">Debug Info:</p>
        <p>{debugInfo}</p>
        <p className="mt-1">
          Selected Type:{" "}
          <span className="font-bold">{formData.wardType || "None"}</span>
        </p>
        <p>
          Current Value:{" "}
          <span className="font-bold">{formData.wardNo || "None"}</span>
        </p>
        <p>
          sectorNo:{" "}
          <span className="font-bold">{formData.sectorNo || "None"}</span>
        </p>
      </div>
    </div>
  );
};

export default WardForm;
