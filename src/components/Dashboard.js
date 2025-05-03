import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import { FaSearch, FaDownload, FaEye, FaBars } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";

const Dashboard = () => {
  const [applications, setApplications] = useState([
    {
      id: "12345678998765",
      subId: "41234555",
      serviceName: "सेवा क्र. १",
      paymentDate: "14/01/2025",
      maxDays: 15,
      expectedDate: "24/01/2025",
      department: "Accounts",
      designatedOfficer:
        "Clerk, Account Department Mumbai Metropolitan Region, Slum Rehabilitation Authority, Thane",
      status: "Accepted",
    },
    {
      id: "12345678998765",
      subId: "41234555",
      serviceName: "सेवा क्र. २",
      maxDays: 15,
      status: "Pending",
    },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BsBriefcaseFill className="text-xl" />
          <h1 className="text-lg font-semibold">Account Department</h1>
        </div>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 hover:bg-indigo-600 rounded-lg transition-colors"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-0 z-20 transform md:transform-none transition-transform duration-300 ease-in-out
        md:relative md:w-80 bg-indigo-700 text-white md:flex flex-col
        ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-indigo-600">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search service"
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="p-4 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors cursor-pointer">
            <h3 className="font-medium mb-2 text-lg">सेवा क्र. १</h3>
            <p className="text-sm leading-relaxed text-indigo-100">
              भाडे - परिपत्रक क्र. ४१ अन्वये सहकार विभागाच्या अहवाल नुसार
              झोपडीओढरमाईच्या बँक खात्यावर भाडे प्रदान तपशीलाच्या प्रमाणित प्रती
              देणे.
            </p>
          </div>

          <div className="p-4 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors cursor-pointer">
            <h3 className="font-medium mb-2 text-lg">सेवा क्र. २</h3>
            <p className="text-sm leading-relaxed text-indigo-100">
              ना. हरकत (एन. ओ. सी. ) परिपत्रक क्र. ३ अंतर्गत प्राप्त
              प्रस्तावच्या अनुषंगाने निर्गमित केलेल्या ना. हरकत (NOC)
              प्रमाणपत्राच्या प्रमाणित प्रती देणे.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <div className="hidden md:block bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <BsBriefcaseFill className="text-2xl text-indigo-700" />
                <h1 className="text-xl font-semibold text-gray-800">
                  Account Department
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Pending
                </button>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  Accepted
                </button>
                <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Status Filters */}
        <div className="md:hidden p-4 bg-white shadow-sm overflow-x-auto">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg whitespace-nowrap">
              Pending
            </button>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg whitespace-nowrap">
              Accepted
            </button>
            <button className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg whitespace-nowrap">
              Rejected
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h2 className="text-lg font-semibold">Applications</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-600 text-white text-sm">
                    <th className="sticky left-0 px-6 py-4 text-left bg-red-600 font-medium">
                      Sr.No
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Application ID
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Service Name
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Payment Date
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Maximum Days
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Expecting Service Delivery Date
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Designated officer
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Remark
                    </th>
                    <th className="px-6 py-4 text-left whitespace-nowrap font-medium">
                      Download File
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="sticky left-0 px-6 py-4 bg-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        <div>{app.id}</div>
                        <div className="text-sm text-gray-500">{app.subId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.paymentDate || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.maxDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.expectedDate || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.department || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.designatedOfficer || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                          ${
                            app.status === "Accepted"
                              ? "bg-blue-100 text-blue-800"
                              : app.status === "Pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-pink-100 text-pink-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <FaEye className="text-lg" />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <FaDownload className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">Page 1 /1</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    First
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Last
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
