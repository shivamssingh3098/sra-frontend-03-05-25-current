import React, { useState } from "react";
import servicesData from "../../data/services.json";
import UserServicesDetailPage from "./UserServicesDetailPage";
import { useRef } from "react";
const UserServices = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const itemRefs = useRef([]);
  return (
    <div className="container-fluid border">
      <div className="row">
        <div
          className="col-md-3  overflow-y-auto"
          style={{ maxHeight: "450px" }}
        >
          <div className="d-block d-md-none">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              सेवेचे नाव
            </button>
            {/* offcanvas for mobile screen devices */}

            <div
              className="offcanvas offcanvas-start"
              tabindex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="" id="offcanvasExampleLabel">
                  सेवेचे नाव
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ol>
                  {servicesData[0].services.map((service, index) => (
                    <li
                      key={index}
                      className="group"
                      ref={(el) => (itemRefs.current[index] = el)}
                    >
                      <div
                        className="flex items-start p-1 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setSelectedServiceId(service.id);
                          itemRefs.current[index]?.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                          });
                        }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span
                            className="font-semibold text-blue-600"
                            style={{ fontSize: "12px" }}
                          >
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p
                            className="text-gray-700 group-hover:text-blue-600"
                            style={{ fontSize: "12px" }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block">
            <h5 className="m-2">सेवेचे नाव</h5>
            <ol>
              {servicesData[0].services.map((service, index) => (
                <li
                  key={index}
                  className="group"
                  ref={(el) => (itemRefs.current[index] = el)}
                >
                  <div
                    className="flex items-start p-1 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      itemRefs.current[index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span
                        className="font-semibold text-blue-600"
                        style={{ fontSize: "12px" }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <p
                        className="text-gray-700 group-hover:text-blue-600"
                        style={{ fontSize: "12px" }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="col-md-9 border">
          <UserServicesDetailPage selectedServiceId={selectedServiceId} />
        </div>
      </div>
    </div>
  );
};

export default UserServices;
