
import React from "react";
import servicesData from "../data/services.json";


const DashboardForm16 = ({ formData, handleChange, nextStage, prevStage }) => {

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 16)
      ?.description || "";
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
            सेवा क्र.१६ {serviceDescription}
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
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">

            <div>
              <label className="block text-gray-700 mb-2">
                अर्जदाराचे नाव <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                दिनांक <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                मोबाईल क्र. <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                पत्ता <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                तालुका <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                भूखंड क्र. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bhukhandNo"
                value={formData.bhukhandNo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                मौजे <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mouje"
                value={formData.mouje}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                जिल्हा <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                वॉर्ड क्र. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="wardNo"
                value={formData.wardNo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                नगरपालिका <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nagarpalika"
                value={formData.nagarpalika}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                सरकारी संस्था <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sarkari"
                value={formData.sarkari}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                पुनर्वसन योजना <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="punervasan"
                value={formData.punervasan}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                झोपडपट्टी <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zopadi"
                value={formData.zopadi}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                पुनर्वसन दिनांक <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="punervasanDate"
                value={formData.punervasanDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                सदनिका <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sadnika"
                value={formData.sadnika}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>


          </form>
          <div className="w-full mt-6">
            <p className="text-red-600 font-semibold text-sm text-center">
              (अर्जदारकडे काही कागद पत्रे असल्यास त्यांच्या छायांकित प्रत सोबत
              अपलोड करावे)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm16;