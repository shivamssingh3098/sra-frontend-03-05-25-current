import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import { FaSearch, FaDownload, FaEye } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const AdminDashboard = () => {
  // Initialize useNavigate

  const location = useLocation();

  const handleNavigation = (status1) => {
    fetchApplications(status1); // Navigate with the status as a parameter
  };
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [remarkByAdminForManager, setRemarkByAdminForManager] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [activeStatus, setActiveStatus] = useState({
    pending: true,
    accepted: false,
    rejected: false,
  });
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
          `/api/v1/department-managers/form-request?page=1&limit=100&serviceStatus=${
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
        if (status === "PENDING") {
          setActiveStatus((prev) => ({
            ...prev,
            pending: true,
            accepted: false,
            rejected: false,
          }));
        }
        if (status === "ACCEPTED") {
          setActiveStatus((prev) => ({
            ...prev,
            pending: false,
            accepted: true,
            rejected: false,
          }));
        }
        if (status === "REJECTED") {
          setActiveStatus((prev) => ({
            ...prev,
            pending: false,
            accepted: false,
            rejected: true,
          }));
        }

        if (response.data && response.data?.data?.data.length > 0) {
          console.log("API response", response.data?.data?.data);
          setApplications(response.data?.data?.data);
        } else {
          console.log("No data found in response");
          setApplications(response.data?.data?.data);
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
  const openModalToAddRemark = (id, remark, formStatus) => {
    console.log("id", id);
    console.log("remark", remark);
    setRemarkByAdminForManager(remark ? remark : "");
    setFormId(id);
    setFormStatus(formStatus);
    // setRemarkByAdminForManager(remark);
  };
  const onSubmitRemarkByAdmin = async (e) => {
    try {
      e.preventDefault();
      console.log("remarkByAdminForManager", remarkByAdminForManager);
      const token = localStorage.getItem("accessToken");

      if (!remarkByAdminForManager) {
        alert("Remark is require to submit ");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        CONFIG.API_BASE_URL +
          `/api/v1/department-managers/create-admin-remark-for-manager?formId=${formId}`,
        { remarkByAdminForManager },
        config
      );
      console.log("response", response);
      setRemarkByAdminForManager("");
      fetchApplications(formStatus);
      // setIsRejectModalOpen(false);
      if (response.data?.success) alert(`Remark has been created successfully`);
    } catch (error) {}
  };

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const departmentCode = localStorage.getItem("department");
  // console.log("userData", userData);

  const departmentName =
    {
      AD: "अकाउंट",
      TPD: "नगर रचना",
      CSD: "नगर भूमापन",
      COD: "सहकारी",
      EMD: "मिळकत",
      TVD: "विशेषकक्ष",
      CAD: "सक्षम प्राधिकरण",
      ED: "अभियांत्रिकी",
      ADMIN: "प्रशासक",
      // Add other departments as needed
    }[departmentCode] || "Unknown Department";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="d-flex justify-content-start align-items-start flex-row ">
        {/* Main Content */}
        <div className="" style={{ width: "100%" }}>
          {/* Header */}
          <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center space-x-3">
                <BsBriefcase className="text-xl" />
                <h1 className="text-xl font-semibold">
                  {" "}
                  {departmentName} डिपार्टमेंट
                </h1>
              </div>
              <div className="flex space-x-2">
                <button
                  style={{
                    backgroundColor: activeStatus.pending ? "red" : "white",
                    color: activeStatus.pending ? "white" : "black",
                  }}
                  className="px-4 py-1  border border-blue-200  rounded"
                  onClick={() => handleNavigation("PENDING")}
                >
                  Pending
                </button>
                <button
                  style={{
                    backgroundColor: activeStatus.accepted ? "red" : "white",
                    color: activeStatus.accepted ? "white" : "black",
                  }}
                  className="px-4 py-1  border border-blue-200 rounded"
                  onClick={() => handleNavigation("ACCEPTED")}
                >
                  Accepted
                </button>
                <button
                  style={{
                    backgroundColor: activeStatus.rejected ? "red" : "white",
                    color: activeStatus.rejected ? "white" : "black",
                  }}
                  className="px-4 py-1  border border-pink-200 rounded"
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
                      <th className="px-2 py-2 text-left font-medium">Sr.No</th>
                      <th className="px-2 py-2 text-left font-medium">
                        Application ID
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Service Number
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Department
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Payment Date
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Maximum Days
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Expecting Service Delivery Date
                      </th>
                      <th className="px-2 py-2 text-left font-medium">
                        Status
                      </th>
                      {/* <th className="px-4 py-2 text-left font-medium">
                        Download Application
                      </th> */}
                      <th className="px-2 py-2 text-left font-medium">
                        View Application
                      </th>
                      {/* {departmentCode == "ADMIN" ? (
                        <th className="px-4 py-2 text-left font-medium">
                          Send Remark To Officer
                        </th>
                      ) : (
                        ""
                      )} */}
                      {departmentCode == "ADMIN" ? (
                        <th className="px-2 py-2 text-left font-medium">
                          Send Remark To Officer
                        </th>
                      ) : (
                        <th className="px-2 py-2 text-left font-medium">
                          View Remark
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {applications &&
                      applications.map((app, index) => (
                        <tr key={index}>
                          <td className="px-2 py-1">{index + 1}</td>
                          <td className="px-2 py-1">
                            {app.applicationId} <br /> {app.applicationId2}
                          </td>
                          <td className="px-2 py-1">{app.serviceNumber}</td>
                          <td className="px-2 py-1">{app.department}</td>
                          <td className="px-2 py-1">
                            {" "}
                            {app.applyDate ? app.applyDate.split("T")[0] : "-"}
                          </td>
                          <td className="px-2 py-1"> {app.maximumDays}</td>
                          <td className="px-2 py-1">
                            {app.expectingServiceDeliveryDate
                              ? app.expectingServiceDeliveryDate.split("T")[0]
                              : "-"}
                          </td>
                          <td className="px-2 ">
                            <Button
                              variant={
                                app.status === "Accepted" ? "success" : "danger"
                              }
                              size="sm"
                            >
                              {app.serviceStatus}
                            </Button>
                          </td>
                          {/* <td className="px-4 py-3">
                            <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm flex items-center space-x-1">
                              <FaDownload className="text-sm" />
                              <span>Download</span>
                            </button>
                          </td> */}
                          <td className="px-2 py-1">
                            <Button
                              variant="dark"
                              size="sm"
                              style={{ backgroundColor: "#2c3e7b" }}
                              onClick={() => handleViewApplication(app)}
                            >
                              View Application
                            </Button>
                          </td>
                          {/* original */}
                          {departmentCode == "ADMIN" ? (
                            <td className="px-2 py-1">
                              <button
                                onClick={() =>
                                  openModalToAddRemark(
                                    app._id,
                                    app?.remarkByAdminForManager,
                                    app?.serviceStatus
                                  )
                                }
                                type="button"
                                className="btn btn-primary"
                                style={{
                                  backgroundColor: app?.remarkByAdminForManager
                                    ? "purple"
                                    : "",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                              >
                                {app?.remarkByAdminForManager
                                  ? "Edit Remark"
                                  : "   Add Remark"}
                              </button>
                            </td>
                          ) : departmentCode !== "ADMIN" &&
                            app?.remarkByAdminForManager ? (
                            <td px-0 py-0>
                              <button
                                onClick={() =>
                                  openModalToAddRemark(
                                    app._id,
                                    app?.remarkByAdminForManager
                                  )
                                }
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                style={{
                                  padding: "2px 6px", // Adjust as needed
                                  margin: "2px", // Optional
                                  fontSize: "15px", // Optional for smaller text
                                }}
                              >
                                Admin Remark
                              </button>
                            </td>
                          ) : (
                            ""
                          )}
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
            <form onSubmit={onSubmitRemarkByAdmin}>
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
                  {departmentCode == "ADMIN" ? (
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter Remark For Department Officer
                      </label>
                      <input
                        onChange={(e) =>
                          setRemarkByAdminForManager(e.target.value)
                        }
                        type="text"
                        // required="true"
                        name="remarkByAdminForManager"
                        value={remarkByAdminForManager}
                        className="form-control"
                        id="exampleFormControlInput1"
                        // placeholder="name@example.com"
                      />
                    </div>
                  ) : (
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Remark From Admin -
                      </label>
                      {remarkByAdminForManager}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  {departmentCode == "ADMIN" ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
