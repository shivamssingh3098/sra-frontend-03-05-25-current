import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import servicesData from "../data/services.json";
import MuncipalCooperation from "./MuncipalCooperation";
import BhukhandForm from "./BhukhandForm";
import WordForm from "./WordForm";

const DashboardForm22 = ({ nextStage, prevStage }) => {
  
  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 22)
      ?.description || "";
      
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    mobile: "",
    address: "",
    taluka: "",
    mouje: "",
    nagarpalika: "",
    bhukhandNo: "",
    wardType: "",
    palikaType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.wardType) {
      setErrorMessage("Please select either सेक्टर क्र or वॉर्ड क्र.");
      return;
    }
    if (
      !formData.name ||
      !formData.date ||
      !formData.mobile ||
      !formData.address
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }
    setSuccessMessage(`Form is successfully sent to: ${formData.wardType}`);
    setErrorMessage(""); // Clear any previous error messages
  };


  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
            सेवा क्र.२२ {serviceDescription}
          </div>
          <p className="text-center text-sm text-gray-700 mt-2">
            (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा
            नमुना)
          </p>

          {/* Progress / Step Tracker */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-blue-700 font-bold">मूलभूत माहिती</p>
            <div className="border border-black px-4 py-1 text-sm">
              ₹ १०/- फी
            </div>
          </div>

          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div>
              <label className="font-medium block mb-1">
                नाव <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="font-medium block mb-1">
                दिनांक <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="font-medium block mb-1">
                मोबाईल नं. <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-medium block mb-1">
                पत्ता <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Taluka */}
            <div>
              <label className="font-medium block mb-1">
                तालुका <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* Bhukhand */}
            <BhukhandForm formData={formData} setFormData={setFormData} />

            {/* Mouje */}
            <div>
              <label className="font-medium block mb-1">
                मौजे <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mouje"
                value={formData.mouje}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {/* District */}
            <div>
              <label className="font-medium block mb-1">
                जिल्हा <span className="text-red-500">*</span>
              </label>
              <select
                name="जिल्हा"
                value={formData.nagarpalika}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">-जिल्हा-</option>
                <option value="mumbai">मुंबई</option>
                <option value="thane">ठाणे</option>
              </select>
            </div>

            {/* Ward */}
            <WordForm formData={formData} setFormData={setFormData} />

            {/* Nagarpalika */}
            <MuncipalCooperation
              formData={formData}
              setFormData={setFormData}
            />

            {/* Sarkari */}
            <div>
              <label className="font-medium block mb-1">
                सहकारी गृह संस्था <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm22;
