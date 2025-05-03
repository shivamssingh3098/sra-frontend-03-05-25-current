import React from "react";
import "../styles/css/ServiceForm.css";

function ServiceForm({ services, onClose, onServiceClick }) {
  return (
    <div className="service-form-container bg-white rounded-lg shadow-lg p-6 sm:shadow-none sm:rounded-none relative vh-full sm:h-auto overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:hidden text-gray-600 hover:text-red-500 text-xl"
      >
        ✕
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
        <div className="flex items-center w-full sm:w-auto">
          <div className="font-bold text-xl text-blue-600 mr-4">सेवा</div>
        </div>
      </div>

      <ul className="space-y-4">
        {services.map((service, index) => (
          <li key={index} className="group">
            <div
              className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                onServiceClick(service.id);
                onClose();
              }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="font-semibold text-blue-600">{index + 1}</span>
              </div>
              <div className="flex-grow">
                <p className="text-gray-700 group-hover:text-blue-600">
                  {service.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceForm;
