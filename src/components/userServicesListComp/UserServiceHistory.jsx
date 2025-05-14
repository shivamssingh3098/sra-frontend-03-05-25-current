import CONFIG from "../../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const UserServiceHistory = () => {
  // Initialize useNavigate

  const location = useLocation();

  const handleNavigation = (status1) => {
    fetchApplications(status1); // Navigate with the status as a parameter
  };
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [userRemark, setUserRemark] = useState({});
  const [formId, setFormId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchApplications();
  }, []);
  const token = localStorage.getItem("accessToken");

  const fetchApplications = async (status) => {
    console.log("Making API request to fetch data...");
    const header = {
      Authorization: "Bearer ",
    };
    console.log(status);
    const response = await axios
      .get(
        CONFIG.API_BASE_URL +
          `/api/v1/users/get-service-request?page=1&limit=100&serviceStatus=${
            status || "PENDING"
          }`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log("API Response received:", {
          status: response.status,
          data: response.data,
          headers: response.headers,
        });

        if (response.data && response.data?.data?.length > 0) {
          console.log("API response---", response.data?.data);
          setApplications(response.data?.data);
        } else {
          console.log("No data found in response");
          setApplications(response.data?.data);
        }
        //setApplications(mockData);
        setError(null);
      })

      .catch((error) => {
        setError("Failed to fetch applications. Please try again later.");
        console.error("Error fetching applications:", error);
      });
  };

  const handleViewApplication = (app) => {
    //navigate("/applicationapproval?id=" + id);
    navigate("/applicationapproval", { state: { app } });
  };
  const acceptedList = (app) => {
    //navigate("/applicationapproval?id=" + id);
    navigate("/applicationapproval", { state: { app } });
  };
  // admin Submit remark
  const openModalToViewRemark = (id, remark) => {
    console.log("id", id);
    console.log("remark", remark);
    setUserRemark(remark ? remark : {});
    setFormId(id);
    // setRemarkByAdminForManager(remark);
  };
  const handleDownload = async () => {
    console.log("userRemark.document", userRemark.document);

    const response = await fetch(userRemark.document);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attachment"; // Optional: give a custom filename
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="d-flex justify-content-start align-items-start flex-row ">
        {/* Main Content */}
        <div className="" style={{ width: "100%" }}>
          {/* Header */}
          <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center space-x-3"></div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-1 bg-red-700 text-white rounded"
                  onClick={() => handleNavigation("PENDING")}
                >
                  Pending
                </button>
                <button
                  className="px-4 py-1 bg-white text-blue-600 border border-blue-200 rounded"
                  onClick={() => handleNavigation("ACCEPTED")}
                >
                  Accepted
                </button>
                <button
                  className="px-4 py-1 bg-white text-pink-600 border border-pink-200 rounded"
                  onClick={() => handleNavigation("REJECTED")}
                >
                  Rejected
                </button>
              </div>
            </div>
          </header>

          {/* Applications Section */}
          <main className="p-6">
            <div className="bg-white rounded-t-lg overflow-hidden">
              <div className="bg-indigo-700 text-white px-6 py-3">
                <h2 className="text-lg font-semibold">Applications</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-red-600 text-white text-sm">
                      <th className="px-4 py-2 text-left font-medium">Sr.No</th>
                      <th className="px-4 py-2 text-left font-medium">
                        Application ID
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Service Number
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Payment Date
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Maximum Days
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Expecting Service Delivery Date
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Department
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        View Remark
                      </th>
                      {/* <th className="px-4 py-2 text-left font-medium">
                        View Application
                      </th> */}
                      {/* {departmentCode == "ADMIN" ? (
                        <th className="px-4 py-2 text-left font-medium">
                          Send Remark To Officer
                        </th>
                      ) : (
                        ""
                      )} */}
                    </tr>
                  </thead>
                  <tbody>
                    {applications &&
                      applications.map((app, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {app.applicationId} <br /> {app.applicationId2}
                          </td>
                          <td className="px-4 py-3">{app.serviceNumber}</td>
                          <td className="px-4 py-3">
                            {" "}
                            {app.applyDate ? app.applyDate.split("T")[0] : "-"}
                          </td>
                          <td className="px-4 py-3"> {app.maximumDays}</td>
                          <td className="px-4 py-3">
                            {app.expectingServiceDeliveryDate
                              ? app.expectingServiceDeliveryDate.split("T")[0]
                              : "-"}
                          </td>
                          <td>
                            <Button
                              variant={
                                app.status === "Accepted" ? "success" : "danger"
                              }
                              size="sm"
                            >
                              {app.serviceStatus}
                            </Button>
                          </td>
                          <td className="px-4 py-3">{app.department}</td>
                          {app?.remark && (
                            <td>
                              <button
                                onClick={() =>
                                  openModalToViewRemark(app._id, app?.remark)
                                }
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                View Remark
                              </button>
                            </td>
                          )}

                          {/* <td>
                            <Button
                              variant="dark"
                              size="sm"
                              style={{ backgroundColor: "#2c3e7b" }}
                              onClick={() => handleViewApplication(app)}
                            >
                              View Application
                            </Button>
                          </td> */}
                          {/* original */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center px-6 py-3 border-t">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Page 1 /1</span>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded">
                    First
                  </button>
                  <button className="px-4 py-1 text-gray-600 border rounded">
                    Previous
                  </button>
                  <button className="px-4 py-1 bg-blue-500 text-white rounded">
                    Last
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* // modal for admin remark  */}
      <div>
        {/* <!-- Button trigger modal --> */}

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Remark
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div class="mb-3 ">
                    {/* <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Remark From  -
                    </label> */}
                    {userRemark.remark}
                  </div>
                  <div class="mb-3">
                    {/* <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Download Attachment -
                    </label> */}
                    <button type="button" onClick={handleDownload}>
                      Click here to{" "}
                      <span style={{ color: "blue" }}>download</span> document
                    </button>
                    {/* <a
                      href={userRemark.document}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Attachment
                    </a> */}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  {/* <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserServiceHistory;
