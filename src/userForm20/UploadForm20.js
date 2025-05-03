import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import servicesData from "../data/services.json";

const UploadForm20 = () => {
  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 20)?.description || "";

  // States for files and previews
  const [files, setFiles] = useState({
    aadharCard: null,
    signature: null,
    panCard: null,
    etcitem: null,
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [field]: {
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
  };

  const renderUploadSection = (label, id, requiredText) => (
    <div className="space-y-2">
      <label className="flex items-start text-sm font-medium text-gray-700">
        <span className="text-red-500 mr-1">*</span>
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          className="hidden"
          id={id}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, id)}
        />
        <label
          htmlFor={id}
          className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
        >
          <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div className="flex-1 text-sm text-gray-500">
            <span className="font-medium">Choose from files</span>
            <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
          </div>
        </label>

        {/* Show file name and preview if selected */}
        {files[id]?.file && (
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
            <span className="font-medium">Selected: {files[id].file.name}</span>
            {files[id].file.type.startsWith("image/") && (
              <img
                src={files[id].preview}
                alt="Preview"
                className="w-32 h-auto border rounded shadow"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold mb-6">
            सेवा क्र.२०: {serviceDescription}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderUploadSection("ओळखपत्र", "aadharCard")}
            {renderUploadSection("स्वाक्षरी", "signature")}
            {renderUploadSection("इतर कागद पत्रे", "panCard")}
            {renderUploadSection("इतर कागद पत्रे", "etcitem")}

            <div className="md:col-span-2 mt-4 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                फाइल अपलोड मार्गदर्शक सूचना:
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>फाइल साइज 2MB पेक्षा कमी असावी</li>
                <li>फक्त PDF, JPG, JPEG किंवा PNG फॉरमॅट स्वीकारले जातील</li>
                <li>कागदपत्रे स्पष्ट आणि वाचनीय असावीत</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm20;
