import { useState } from "react";

const MuncipalCooperation = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset nagarpalika value if palikaType changes
    if (name === "palikaType") {
      setFormData((prevData) => ({
        ...prevData,
        palikaType: value,
        nagarpalika: "", // clear dropdown selection
      }));
    }
  };

  // Define dropdown options based on palikaType
  const getDropdownOptions = () => {
    if (formData.palikaType === "महानगरपालिका") {
      return ["A", "B", "C"];
    } else if (formData.palikaType === "नगरपालिका") {
      return ["D", "E", "F"];
    } else if (formData.palikaType === "ग्रामपंचायत") {
      return ["G", "H", "I"];
    } else {
      return [];
    }
  };

  return (
    <div className="md:col-span-3 px-4 sm:px-6 lg:px-8 py-4">
      {/* Radio buttons for Palika Type */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="palikaType"
            value="महानगरपालिका"
            checked={formData.palikaType === "महानगरपालिका"}
            onChange={handleChange}
          />
          महानगरपालिका
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="palikaType"
            value="नगरपालिका"
            checked={formData.palikaType === "नगरपालिका"}
            onChange={handleChange}
          />
          नगरपालिका
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="palikaType"
            value="ग्रामपंचायत"
            checked={formData.palikaType === "ग्रामपंचायत"}
            onChange={handleChange}
          />
          ग्रामपंचायत
        </label>
      </div>

      {/* Dropdown for Nagarpalika */}
      <select
        name="nagarpalika"
        value={formData.nagarpalika}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
        disabled={!formData.palikaType} // disable until radio is selected
      >
        <option value="">-निवडा-</option>
        {getDropdownOptions().map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MuncipalCooperation;
