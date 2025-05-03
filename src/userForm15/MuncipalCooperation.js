import { useState, useEffect } from "react";

const MUNICIPAL_CORPORATIONS = [
  "THANE",
  "KALYAN-DOMBIVALI",
  "NAVI-MUMBAI",
  "ULHASNAGAR",
  "BHIWANDI-NIZAMAPUR",
  "VASAI-VIRAR",
  "MIRA-BHAYANDAR",
  "PANVEL",
];

const CITY_COUNCIL = [
  "AMBERNATH",
  "KULGAON-BADLAPUR",
  "ALIBAG",
  "PEN",
  "ULHASNAGAR",
  "KHOPOLI",
  "MATHERAN",
  "KARJAT",
  "PALGHAR",
];

const VILLAGE_COUNCIL = ["BOISAR"];

const MuncipalCooperation = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState({
    palikaType: formData.palikaType || "",
    nagarpalika: formData.nagarpalika || "",
  });

  // Log initial props
  useEffect(() => {
    console.log("MuncipalCooperation received props:", {
      palikaType: formData.palikaType,
      nagarpalika: formData.nagarpalika,
      municipalCorporation: formData.municipalCorporation,
      cityCouncil: formData.cityCouncil,
      villageCouncil: formData.villageCouncil,
    });
  }, []);

  // Update parent form data when local form data changes
  useEffect(() => {
    // Determine which field to update based on the selected type
    let updateData = {
      palikaType: localFormData.palikaType,
      nagarpalika: localFormData.nagarpalika,
    };

    // Clear all council fields first
    updateData.municipalCorporation = "";
    updateData.cityCouncil = "";
    updateData.villageCouncil = "";

    // Then set only the appropriate one if a valid value is selected
    if (
      localFormData.palikaType === "महानगरपालिका" &&
      localFormData.nagarpalika
    ) {
      updateData.municipalCorporation = localFormData.nagarpalika;
    } else if (
      localFormData.palikaType === "नगरपालिका" &&
      localFormData.nagarpalika
    ) {
      updateData.cityCouncil = localFormData.nagarpalika;
    } else if (
      localFormData.palikaType === "ग्रामपंचायत" &&
      localFormData.nagarpalika
    ) {
      updateData.villageCouncil = localFormData.nagarpalika;
    }

    // Log what we're updating
    console.log("Updating parent formData with:", updateData);

    // Update the parent's formData
    setFormData((prevData) => ({
      ...prevData,
      ...updateData,
    }));
  }, [localFormData, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Log the change
    console.log(`Changing ${name} to: ${value}`);

    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset nagarpalika value if palikaType changes
    if (name === "palikaType") {
      console.log("Palika type changed, resetting nagarpalika");
      setLocalFormData((prevData) => ({
        ...prevData,
        palikaType: value,
        nagarpalika: "", // clear dropdown selection
      }));
    }

    // Log the selection
    if (name === "nagarpalika") {
      console.log("Selected Council:", value);
      console.log("Council Type:", localFormData.palikaType);
    }
  };

  // Define dropdown options based on palikaType
  const getDropdownOptions = () => {
    if (localFormData.palikaType === "महानगरपालिका") {
      return MUNICIPAL_CORPORATIONS;
    } else if (localFormData.palikaType === "नगरपालिका") {
      return CITY_COUNCIL;
    } else if (localFormData.palikaType === "ग्रामपंचायत") {
      return VILLAGE_COUNCIL;
    } else {
      return [];
    }
  };

  // Get the council type in English
  const getCouncilType = () => {
    switch (localFormData.palikaType) {
      case "महानगरपालिका":
        return "Municipal Corporation";
      case "नगरपालिका":
        return "City Council";
      case "ग्रामपंचायत":
        return "Village Council";
      default:
        return "";
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
            checked={localFormData.palikaType === "महानगरपालिका"}
            onChange={handleChange}
          />
          महानगरपालिका
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="palikaType"
            value="नगरपालिका"
            checked={localFormData.palikaType === "नगरपालिका"}
            onChange={handleChange}
          />
          नगरपालिका
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="palikaType"
            value="ग्रामपंचायत"
            checked={localFormData.palikaType === "ग्रामपंचायत"}
            onChange={handleChange}
          />
          ग्रामपंचायत
        </label>
      </div>

      {/* Dropdown for Nagarpalika */}
      <select
        name="nagarpalika"
        value={localFormData.nagarpalika}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 text-sm sm:text-base"
        required
        disabled={!localFormData.palikaType} // disable until radio is selected
      >
        <option value="">-निवडा-</option>
        {getDropdownOptions().map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Display selected value */}
      {localFormData.nagarpalika && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium text-gray-700">
            Selected {getCouncilType()}:{" "}
            <span className="font-bold text-blue-600">
              {localFormData.nagarpalika}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            This value will be stored in the parent form as:{" "}
            <span className="font-semibold">
              {localFormData.palikaType === "महानगरपालिका"
                ? "municipalCorporation"
                : localFormData.palikaType === "नगरपालिका"
                ? "cityCouncil"
                : "villageCouncil"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MuncipalCooperation;
