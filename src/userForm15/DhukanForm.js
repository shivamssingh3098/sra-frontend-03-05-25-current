import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";

const BhukhandForm = ({ formData, setFormData }) => {
  const [debugInfo, setDebugInfo] = useState("");

  // Log form data changes for debugging
  useEffect(() => {
    setDebugInfo(
      `Current bhukhandType: ${formData.bhukhandType}, bhukhandNo: ${formData.bhukhandNo}, landNumber: ${formData.landNumber}, surveyNo: ${formData.surveyNo}, finalPlot: ${formData.finalPlot}`
    );
    console.log("BhukhandForm - Form data updated:", {
      bhukhandType: formData.bhukhandType,
      bhukhandNo: formData.bhukhandNo,
      landNumber: formData.landNumber,
      surveyNo: formData.surveyNo,
      finalPlot: formData.finalPlot,
    });
  }, [
    formData.bhukhandType,
    formData.bhukhandNo,
    formData.landNumber,
    formData.surveyNo,
    formData.finalPlot,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("BhukhandForm - Input Change:", { name, value });

    // If changing the bhukhandType, reset all related fields
    if (name === "bhukhandType") {
      console.log("BhukhandForm - Changing bhukhandType to:", value);
      setFormData((prev) => {
        const newData = {
          ...prev,
          bhukhandType: value,
          // Clear all possible fields
          bhukhandNo: "",
          finalPlot: "",
          wardNo: "",
          landNumber: "",
          surveyNo: "",
        };
        console.log(
          "BhukhandForm - Updated form data after type change:",
          newData
        );
        return newData;
      });
    }
    // If changing the bhukhandNo, update the appropriate field based on bhukhandType
    else if (name === "bhukhandNo") {
      // Create an update object with the bhukhandNo
      const updateData = {
        bhukhandNo: value,
      };

      // Based on the selected bhukhandType, update the appropriate field
      switch (formData.bhukhandType) {
        case "न.भू, क्र":
          updateData.finalPlot = value;
          console.log("BhukhandForm - Setting finalPlot:", value);
          break;
        case "सर्व्हे न.":
          updateData.surveyNo = value;
          console.log("BhukhandForm - Setting surveyNo:", value);
          break;
        case "अं.भू.क्र":
          updateData.landNumber = value;
          console.log("BhukhandForm - Setting landNumber:", value);
          break;
        default:
          console.log(
            "BhukhandForm - No type selected, only updating bhukhandNo"
          );
          break;
      }

      // Update the form data
      setFormData((prev) => {
        const newData = {
          ...prev,
          ...updateData,
        };
        console.log(
          "BhukhandForm - Updated form data after number change:",
          newData
        );
        return newData;
      });
    }
    // For any other field, just update it directly
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="font-medium block mb-2 text-sm md:text-base">
        भुखंड प्रकार आणि क्रमांक <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="न.भू, क्र"
            checked={formData.bhukhandType === "न.भू, क्र"}
            onChange={handleChange}
          />
          न.भू, क्र
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="सर्व्हे न."
            checked={formData.bhukhandType === "सर्व्हे न."}
            onChange={handleChange}
          />
          सर्व्हे न.
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="bhukhandType"
            value="अं.भू.क्र"
            checked={formData.bhukhandType === "अं.भू.क्र"}
            onChange={handleChange}
          />
          अं.भू.क्र
        </label>
      </div>

      <input
        type="number"
        name="bhukhandNo"
        value={formData.bhukhandNo}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm md:text-base"
        placeholder="भुखंड क्रमांक टाका"
        required
      />

      {/* Display current selection */}
      {formData.bhukhandType && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
          <p>
            Selected Type:{" "}
            <span className="font-semibold">{formData.bhukhandType}</span>
          </p>
          <p>
            Will update:{" "}
            <span className="font-semibold">
              {formData.bhukhandType === "न.भू, क्र"
                ? "finalPlot"
                : formData.bhukhandType === "सर्व्हे न."
                ? "surveyNo"
                : formData.bhukhandType === "अं.भू.क्र"
                ? "landNumber"
                : ""}
            </span>
          </p>
          {formData.bhukhandNo && (
            <p>
              Current Value:{" "}
              <span className="font-semibold">{formData.bhukhandNo}</span>
            </p>
          )}
          <p>
            landNumber:{" "}
            <span className="font-semibold">
              {formData.landNumber || "Not set"}
            </span>
          </p>
          <p>
            surveyNo:{" "}
            <span className="font-semibold">
              {formData.surveyNo || "Not set"}
            </span>
          </p>
          <p>
            finalPlot:{" "}
            <span className="font-semibold">
              {formData.finalPlot || "Not set"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BhukhandForm;
