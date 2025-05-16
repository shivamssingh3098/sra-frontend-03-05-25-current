// import CONFIG from "../app.config"; // adjust path as needed
import React, { useEffect, useState } from "react";
import servicesData from "../data/services.json";
import { useNavigate } from "react-router-dom";

function ServiceDetails({ selectedServiceId }) {
  const [serviceData, setServiceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedServiceId !== null) {
      const allServices = servicesData[0]?.services || [];
      const selected = allServices.find((s) => s.id === selectedServiceId);

      if (selected) {
        setServiceData({
          title: `सेवा क्र. ${selected.id} - ${selected.description}`,
          serviceTable: {
            serviceNo: selected.id,
            serviceName: selected.description,
            timeLimit: selected.duration_days || "N/A",
            officers: {
              designated: selected.officer || "N/A",
              firstAppeal: selected.first_appeal || "N/A",
              secondAppeal: selected.second_appeal || "N/A",
            },
          },
          requiredDocuments: selected.requiredDocuments || [],
          formPath: "application?serviceId=" + selected.id || "/form",
        });
      }
    }
  }, [selectedServiceId]);

  if (!selectedServiceId || !serviceData) return null;

  const handleFormNavigation = () => {
    navigate(serviceData.formPath);
  };

  return (
    <div className="flex min-h-screen bg-blue-50 ">
      {/* Left 20% space */}
      <div className="w-[20%] hidden sm:block "></div>

      {/* Right 80% content */}
      <div className="w-full sm:w-[80%] p-4 sm:p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Header Title */}
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 text-center">
            {serviceData.title}
          </h2>

          {/* Required Documents AFTER Title */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <h3 className="text-lg font-medium mb-2 text-blue-800">
              लागणारे कागदपत्र (कोणतेही एक)
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
              {serviceData.requiredDocuments.length ? (
                serviceData.requiredDocuments.map((doc, i) => (
                  <li key={i}>{doc.name}</li>
                ))
              ) : (
                <li>Documents not available</li>
              )}
            </ul>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border border-gray-300 mb-6 text-sm sm:text-base">
              <thead className="bg-blue-100 text-gray-700 font-semibold">
                <tr>
                  <th className="p-2 border">सेवा क्र</th>
                  <th className="p-2 border">सेवेचे नाव</th>
                  <th className="p-2 border">
                    सेवेचे पूर्णत्व करण्याची कालावधी (दिवस)
                  </th>
                  <th className="p-2 border">पदनिर्देशित अधिकारी</th>
                  <th className="p-2 border">प्रथम आपिलिय अधिकारी</th>
                  <th className="p-2 border">द्वितीय आपिलिय अधिकारी</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">
                    {serviceData.serviceTable.serviceNo}
                  </td>
                  <td className="p-2 border">
                    {serviceData.serviceTable.serviceName}
                  </td>
                  <td className="p-2 border">
                    {serviceData.serviceTable.timeLimit}
                  </td>
                  <td className="p-2 border whitespace-pre-wrap">
                    {serviceData.serviceTable.officers.designated}
                  </td>
                  <td className="p-2 border whitespace-pre-wrap">
                    {serviceData.serviceTable.officers.firstAppeal}
                  </td>
                  <td className="p-2 border whitespace-pre-wrap">
                    {serviceData.serviceTable.officers.secondAppeal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleFormNavigation}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              पुढे जा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
