import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import { FaSearch, FaDownload, FaEye } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

// const Remark = () => {
//   const [applications, setApplications] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchApplications();
//   }, []);
//   const token = localStorage.getItem("accessToken");

//   const fetchApplications = async () => {

//     console.log("Making API request to fetch data...");
//     const header = {
//       "Authorization": "Bearer "
//     }
//     const response = await axios.get(CONFIG.API_BASE_URL +
//       "/all-pending-request-for-certified-rent-deposit-copies2?page=1&limit=2&serviceStatus=PENDING", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//     ).then(response => {
//       console.log(response.data);
//       console.log("API Response received:", {
//         status: response.status,
//         data: response.data,
//         headers: response.headers,
//       });

//       if (response.data && response.data?.data?.data.length > 0) {
//         console.log("API response", response.data?.data?.data);
//         setApplications(response.data?.data?.data);
//       } else {
//         console.log("No data found in response");
//       }
//       //setApplications(mockData);
//       setError(null);
//     })
//       .catch(error => {
//         setError('Failed to fetch applications. Please try again later.');
//         console.error('Error fetching applications:', error);
//       });

//   };

//   const handleViewApplication = (app) => {
//     //navigate("/applicationapproval?id=" + id);
//     navigate('/applicationapproval', { state: {  app } });
//   };
//   return (
//     <div className="container mt-4 vh-100">
//       <div className="d-flex align-items-center gap-2 mb-3">
//         <b className='d-flex fs-4 align-items-center gap-2'>
//           <BsBriefcaseFill />
//           <p className="fs-4 mb-0">अकाउंट डिपार्टमेंट</p>
//         </b>
//       </div>

//       <div className="remark-header d-flex align-items-center justify-content-between p-2" style={{ backgroundColor: '#2c3e7b' }}>
//         <span className="text-white fw-bold ml-2"> REMARK FROM ADMIN</span>
//         <div className="page-number-box">3</div>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <Table bordered responsive className="text-center">
//         <thead className="text-white">
//           <tr>
//             <th style={{ backgroundColor: '#e12d40' }}>Sr.No</th>
//             <th style={{ backgroundColor: '#e12d40' }}>Application ID</th>
//             <th style={{ backgroundColor: '#e12d40' }}>Number of documents to be attached </th>
//             <th style={{ backgroundColor: '#e12d40' }}>Whether payment has to be collected?</th>
//             <th style={{ backgroundColor: '#e12d40' }}>Maximum days </th>
//             <th style={{ backgroundColor: '#e12d40' }}>Expecting service delivery date </th>
//             <th style={{ backgroundColor: '#e12d40' }}>Download application</th>

//             <th style={{ backgroundColor: '#e12d40' }}>Status</th>
//             <th style={{ backgroundColor: '#e12d40' }}>View Application</th>

//           </tr>
//         </thead>
//         <tbody>
//           {applications.map((app, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>
//                 {app.applicationId} <br /> {app.applicationId2}
//               </td>
//               <td>
//                 dummy
//               </td>
//               <td>
//                 dummy
//               </td>
//               <td>
//                 dummy
//               </td>
//               <td>
//                 dummy
//               </td>
//               <td>
//                 <Button variant="dark" size="sm" style={{ backgroundColor: '#2c3e7b' }}> Download</Button>
//               </td>
//               <td>
//                 <Button
//                   variant={app.status === 'Accepted' ? 'success' : 'danger'}
//                   size="sm"
//                 >
//                   {app.serviceStatus}
//                 </Button>
//               </td>
//               <td>
//                 <Button variant="dark" size="sm" style={{ backgroundColor: '#2c3e7b' }} onClick={() => handleViewApplication(app)}>View Application</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };
// Import the useNavigate hook

const AdminDashboard = () => {
  // Initialize useNavigate

  const location = useLocation();

  const handleNavigation = (status1) => {
    fetchApplications(status1); // Navigate with the status as a parameter
  };
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
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
          `/api/v1/department-managers/form-request?page=1&limit=1000&serviceStatus=${
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
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const departmentCode = localStorage.getItem("department");
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
      // Add other departments as needed
    }[departmentCode] || "Unknown Department";

  const department = userData?.department;
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
                  {departmentName} डिपार्टमेंट
                </h1>
              </div>
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
                        Service No
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Apply  Date
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
                        Download Application
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        View Application
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {app.applicationId} <br /> {app.applicationId2}
                        </td>
                        <td className="px-4 py-3">{app.serviceNumber}</td>
                        <td className="px-4 py-3">
                          {app.applyDate ? app.applyDate.split("T")[0] : "-"}
                        </td>
                        <td className="px-2 py-3 align-center">
                          {app.maximumDays}
                        </td>
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
                        <td className="px-4 py-3">
                          <button className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm flex items-center space-x-1">
                            <FaDownload className="text-sm" />
                            <span>Download</span>
                          </button>
                        </td>
                        <td>
                          <Button
                            variant="dark"
                            size="sm"
                            style={{ backgroundColor: "#2c3e7b" }}
                            onClick={() => handleViewApplication(app)}
                          >
                            View Application
                          </Button>
                        </td>
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
    </div>
  );
};

export default AdminDashboard;
