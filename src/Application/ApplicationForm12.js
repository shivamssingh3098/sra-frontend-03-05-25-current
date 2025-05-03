import React from "react";
import servicesData from "../data/services.json";

const ApplicationForm12 = ({
  formData,
  handleChange,
  nextStage,
  prevStage,
}) => {
  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 12)
      ?.description || "";

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
          सेवा क्र.12: {serviceDescription}
        </div>
        <p className="text-center text-sm text-gray-700 mt-2">
          (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा नमुना)
        </p>

        {/* Progress */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-700 font-bold">मूलभूत माहिती</p>
          <div className="border border-black px-4 py-1 text-sm">₹ १०/- फी</div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
          {/* Basic Info */}
          <Input
            label="नाव"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="दिनांक"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            label="मोबाईल नं."
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          {/* Address Info */}
          <Input
            label="पत्ता"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            label="तालुका"
            name="taluka"
            value={formData.taluka}
            onChange={handleChange}
            required
          />
          <Input
            label="भू. क्र"
            name="bhukhandNo"
            value={formData.bhukhandNo}
            onChange={handleChange}
            required
          />
          <Input
            label="मौजे"
            name="mouje"
            value={formData.mouje}
            onChange={handleChange}
            required
          />
          <Input
            label="जिल्हा"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />
          <Input
            label="सेक्टर क्र./वॉर्ड क्र"
            name="wardNo"
            value={formData.wardNo}
            onChange={handleChange}
            required
          />

          {/* Dropdown */}
          <div>
            <label className="font-medium block mb-1">
              महानगरपालिका <span className="text-red-500">*</span>
            </label>
            <select
              name="nagarpalika"
              value={formData.nagarpalika}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-निवडा-</option>
              <option value="mumbai">मुंबई</option>
              <option value="thane">ठाणे</option>
            </select>
          </div>

          {/* Additional Fields */}
          <Input
            label="सरकारी गृह संस्था"
            name="sarkariGrahSanstha"
            value={formData.sarkariGrahSanstha}
            onChange={handleChange}
            required
          />
          <Input
            label="अनु क्र"
            name="anuKramank"
            value={formData.anuKramank}
            onChange={handleChange}
            required
          />
          <Input
            label="झोपडी क्र."
            name="zhopadiNo"
            value={formData.zhopadiNo}
            onChange={handleChange}
            required
          />
          <Input
            label="सोडती दिनांक"
            type="date"
            name="sodtiDate"
            value={formData.sodtiDate}
            onChange={handleChange}
            required
          />
          <Input
            label="सदनिका क्र."
            name="sadanikaNo"
            value={formData.sadanikaNo}
            onChange={handleChange}
            required
          />
          <Input
            label="पती / पत्नी निधन दिनांक"
            type="date"
            name="spouseDeathDate"
            value={formData.spouseDeathDate}
            onChange={handleChange}
            required
          />
        </form>

        {/* Note */}
        <div className="w-full mt-6">
          <p className="text-red-600 font-semibold text-sm text-center">
            (अर्जदारकडे काही कागद पत्रे असल्यास त्यांच्या छायांकित प्रत सोबत
            अपलोड करावे)
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="font-medium block mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
      required={required}
    />
  </div>
);

export default ApplicationForm12;
