import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import axios from "axios";

// Options you provided
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

const DEPARTMENT = ["AD", "TPD", "CSD", "COD", "EMD", "TVD", "CAD", "ED"];

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

const CertifiedRenDepositForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    applyDate: "",
    phone: "",
    address: "",
    city: "",
    taluka: "",
    village: "",
    villageCouncil: "",
    municipalCorporation: "",
    department: "",
    governmentServiceBranch: "",
    sectorNo: "",
    wardNo: "",
    landNumber: "",
    surveyNo: "",
    finalPlot: "",
  });

  const [areaType, setAreaType] = useState("");
  const [sectorOrWard, setSectorOrWard] = useState("");
  const [landDetails, setLandDetails] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAreaTypeChange = (e) => {
    setAreaType(e.target.value);
    setFormData((prev) => ({
      ...prev,
      city: "",
      village: "",
      municipalCorporation: "",
    }));
  };

  const handleSectorOrWardChange = (choice) => {
    setSectorOrWard(choice);
    setFormData((prev) => ({
      ...prev,
      sectorNo: "",
      wardNo: "",
    }));
  };

  const handleLandDetailsChange = (choice) => {
    setLandDetails(choice);
    setFormData((prev) => ({
      ...prev,
      landNumber: "",
      surveyNo: "",
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/users/create-certified-ren-deposit-copies",
        formData
      );
      alert("Form submitted successfully! Now upload documents.");
      const newId = response.data.data._id;
      window.location.href = `/upload-documents/${newId}`;
    } catch (error) {
      console.error(error);
      alert("Error submitting form. Please check your backend.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Certified Ren Deposit Form</h1>
      <form onSubmit={handleSubmitForm} className="space-y-4">
        {/* Basic Fields */}
        <input
          type="text"
          name="name"
          placeholder="User ID"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="applyDate"
          placeholder="Apply Date"
          value={formData.applyDate}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="taluka"
          placeholder="Taluka"
          value={formData.taluka}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="village"
          placeholder="Village Name"
          value={formData.village}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Area Type Selection */}
        <div className="space-y-2">
          <label className="font-semibold">Select Area Type:</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setAreaType("Village")}
              className={`p-2 border ${
                areaType === "Village" ? "bg-blue-200" : ""
              }`}
            >
              Village
            </button>
            <button
              type="button"
              onClick={() => setAreaType("City")}
              className={`p-2 border ${
                areaType === "City" ? "bg-blue-200" : ""
              }`}
            >
              City
            </button>
            <button
              type="button"
              onClick={() => setAreaType("Municipal")}
              className={`p-2 border ${
                areaType === "Municipal" ? "bg-blue-200" : ""
              }`}
            >
              Municipal Corporation
            </button>
          </div>
        </div>

        {/* Area Dropdown based on selection */}
        {areaType === "Village" && (
          <select
            name="village"
            value={formData.village}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Village</option>
            {VILLAGE_COUNCIL.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        {areaType === "City" && (
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select City</option>
            {CITY_COUNCIL.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        {areaType === "Municipal" && (
          <select
            name="municipalCorporation"
            value={formData.municipalCorporation}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Municipal Corporation</option>
            {MUNICIPAL_CORPORATIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        {/* Department */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Department</option>
          {DEPARTMENT.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Government Service Branch */}
        <input
          type="text"
          name="governmentServiceBranch"
          placeholder="Government Service Branch"
          value={formData.governmentServiceBranch}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* SectorNo / WardNo Selection */}
        <div className="space-y-2">
          <label className="font-semibold">Sector No or Ward No:</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSectorOrWardChange("sectorNo")}
              className={`p-2 border ${
                sectorOrWard === "sectorNo" ? "bg-green-200" : ""
              }`}
            >
              Sector No
            </button>
            <button
              type="button"
              onClick={() => handleSectorOrWardChange("wardNo")}
              className={`p-2 border ${
                sectorOrWard === "wardNo" ? "bg-green-200" : ""
              }`}
            >
              Ward No
            </button>
          </div>
        </div>

        {sectorOrWard === "sectorNo" && (
          <input
            type="text"
            name="sectorNo"
            placeholder="Sector No"
            value={formData.sectorNo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}
        {sectorOrWard === "wardNo" && (
          <input
            type="text"
            name="wardNo"
            placeholder="Ward No"
            value={formData.wardNo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        {/* LandNumber / SurveyNo Selection */}
        <div className="space-y-2">
          <label className="font-semibold">Land Details:</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleLandDetailsChange("landNumber")}
              className={`p-2 border ${
                landDetails === "landNumber" ? "bg-yellow-200" : ""
              }`}
            >
              Land Number
            </button>
            <button
              type="button"
              onClick={() => handleLandDetailsChange("surveyNo")}
              className={`p-2 border ${
                landDetails === "surveyNo" ? "bg-yellow-200" : ""
              }`}
            >
              Survey No
            </button>
          </div>
        </div>

        {landDetails === "landNumber" && (
          <input
            type="text"
            name="landNumber"
            placeholder="Land Number"
            value={formData.landNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}
        {landDetails === "surveyNo" && (
          <input
            type="text"
            name="surveyNo"
            placeholder="Survey No"
            value={formData.surveyNo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        )}

        {/* Always show City and Final Plot input */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="finalPlot"
          placeholder="Final Plot"
          value={formData.finalPlot}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CertifiedRenDepositForm;
