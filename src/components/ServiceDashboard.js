import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import ServiceListComponent from "./ServiceListComponent";
import ServiceDetails from "./ServiceDetails";
const ServicesDashboard = ({ serverId }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  return (
    <div className="">
      {/* this is service left bar from where we chose service to fill form and see
      form info */}
      {/* <div className="row">
        <div className="col-4 border">
          <ServiceListComponent onServiceClick={setSelectedServiceId} />
        </div>

        <div className="col-8 border">
          <ServiceDetails selectedServiceId={selectedServiceId} />
        </div>
      </div> */}

      <ServiceListComponent setSelectedServiceId={setSelectedServiceId} />
      <ServiceDetails selectedServiceId={selectedServiceId} />
    </div>
  );
};

export default ServicesDashboard;
