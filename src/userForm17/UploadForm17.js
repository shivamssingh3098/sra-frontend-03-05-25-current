import React from "react";
import servicesData from "../data/services.json";

const UploadForm17 = ({ nextStage, prevStage , handleChange}) => {

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 17)
      ?.description || "";
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold mb-6">
            सेवा क्र.१७ {serviceDescription}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                आधार कार्ड <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="aadharCard"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                स्वीकार्य फॉरमॅट: PDF, JPG, JPEG, PNG (कमाल आकार: 2MB)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                स्वाक्षरी <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="signature"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                स्वीकार्य फॉरमॅट: PDF, JPG, JPEG, PNG (कमाल आकार: 2MB)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                पॅन कार्ड <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="panCard"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                स्वीकार्य फॉरमॅट: PDF, JPG, JPEG, PNG (कमाल आकार: 2MB)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                इतर दस्तऐवज <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="otherDocuments"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                स्वीकार्य फॉरमॅट: PDF, JPG, JPEG, PNG (कमाल आकार: 2MB)
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};

export default UploadForm17;
