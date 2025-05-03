import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import ServiceListComponent from "./ServiceListComponent";
import ServiceDetails from "./ServiceDetails";
const ServicesDashboard = ({serverId}) => {
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    
  return (
    <div>
    <ServiceListComponent onServiceClick={setSelectedServiceId} />
    
    
    <ServiceDetails selectedServiceId={selectedServiceId} />
    </div>
  );
};

export default ServicesDashboard;
