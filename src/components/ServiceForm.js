import React from "react";

const ServiceForm = ({ services, onClose }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">सेवा</h2>
        <button
          onClick={onClose}
          className="sm:hidden text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <h3 className="font-medium text-lg mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceForm;
