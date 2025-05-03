import React from "react";
import servicesData from "../data/services.json";

const ServiceList = () => {
  const services = servicesData[0].services;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-blue-900">
          सेवा यादी
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-blue-100 font-semibold text-blue-800 text-sm lg:text-base">
            <div className="col-span-1 text-center">क्र.</div>
            <div className="col-span-11">सेवा वर्णन</div>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map((service) => (
              <div
                key={service.id}
                className="grid grid-cols-12 gap-4 py-5 px-6 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                <div className="col-span-1 text-center font-medium text-blue-600 text-sm lg:text-lg">
                  {service.id}
                </div>
                <div className="col-span-11 text-gray-700 text-sm lg:text-lg">
                  {service.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
