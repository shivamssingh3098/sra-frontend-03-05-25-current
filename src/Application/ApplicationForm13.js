import React from "react";

const ApplicationForm13 = ({
  formData,
  handleChange,
  nextStage,
  prevStage,
}) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
            सेवा क्र.13 भाडे - परिपत्रक क्र. १४ अन्यो सहकार विभागाच्या अहवाल
            नुसार झोपडओत्तरमाईझच्या बँक खात्यावर भाडे प्रदान तपशीलाच्या प्रमाणित
            प्रती देणे.
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
          
            
            <div>
              <label className="font-medium block mb-1">
              सरकारी गृह संस्था  <span className="text-red-500">*</span>
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

      
            <div>
              <label className="font-medium block mb-1">
              सदनिका क्र.   <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
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

export default ApplicationForm13;
