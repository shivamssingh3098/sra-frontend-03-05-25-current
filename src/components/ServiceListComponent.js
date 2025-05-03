import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import ServiceForm from "../commponents/ServiceForm";
import servicesData from "../data/services.json";

function ServiceListComponent({ onServiceClick }) {
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const extractedServices = servicesData[0].services.map((service) => ({
        id: service.id,
        description: service.description,
        formPath: service.formPath,
      }));
      setServices(extractedServices);
      setLoading(false);
    } catch (error) {
      console.error("Error loading services:", error);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {/* Toggle Button for mobile view */}
      <button
        onClick={() => setShowServices(true)}
        className="sm:hidden m-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        सेवा पहा
      </button>

      {/* Overlay when service form is open (for mobile) */}
      {showServices && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setShowServices(false)}
        />
      )}

      {/* Service Panel */}
      <div
        className={`fixed sm:static top-0 right-0 h-screen sm:h-auto bg-white sm:bg-transparent z-50 transform transition-transform duration-300 ${
          showServices ? "translate-x-0" : "translate-x-full"
        } sm:translate-x-0 w-4/5 sm:w-full max-w-md sm:max-w-none shadow-lg sm:shadow-none`}
      >
        {loading ? (
          <div className="p-4 text-center">Loading services...</div>
        ) : (
          // Scrollable section with always-visible scrollbar
          <div
            className="h-full overflow-y-scroll"
            style={{
              scrollbarWidth: "auto", // Firefox
              msOverflowStyle: "auto", // IE 10+
            }}
          >
            <ServiceForm
              services={services}
              onClose={() => setShowServices(false)}
              onServiceClick={onServiceClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceListComponent;
