import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import CustomButton from "./CustomButton";

const UserCourse = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100 text-sm font-sans relative">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-20 sm:hidden flex items-center justify-between bg-indigo-900 text-white px-4 py-3">
        <h1 className="text-lg font-bold">🏢 Account Dept</h1>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed sm:relative w-4/5 sm:w-[20%] h-full bg-indigo-900 text-white p-4 z-10
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        <input
          type="text"
          placeholder="Search service"
          className="w-full px-3 py-2 rounded text-black mb-4"
        />

        <div className="space-y-6">
          <div>
            <h2 className="font-bold">सेवा क्र. १</h2>
            <p className="text-xs mt-1">
              भाडे - परिपत्रक क्र. ४४ अनुसार झोपडपट्टीधारकांच्या बँक खात्यावर
              भाडे प्रमाणपत्र प्रदान करणे.
            </p>
          </div>

          <div>
            <h2 className="font-bold">सेवा क्र. २</h2>
            <p className="text-xs mt-1">
              ना. हरकत प्रमाणपत्र (NOC) प्रदान करणे.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 mt-16 sm:mt-0 w-full sm:w-[80%]">
        <div className="hidden sm:flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">🏢 Account Department</h1>
          <div className="space-x-2">
            <CustomButton variant="danger">Pending</CustomButton>
            <CustomButton variant="secondary">Accepted</CustomButton>
            <CustomButton variant="outline">Rejected</CustomButton>
          </div>
        </div>

        <div className="bg-white shadow rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Sr. No</th>
                  <th className="px-4 py-2 text-left">Application ID</th>
                  <th className="px-4 py-2 text-left">Service Name</th>
                  <th className="px-4 py-2 text-left">Payment Date</th>
                  <th className="px-4 py-2 text-left">Max Days</th>
                  <th className="px-4 py-2 text-left">Delivery Date</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left">Officer</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Remark</th>
                  <th className="px-4 py-2 text-left">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">1234567899876541234555</td>
                  <td className="px-4 py-2">सेवा क्र. १</td>
                  <td className="px-4 py-2">14/01/2025</td>
                  <td className="px-4 py-2">15</td>
                  <td className="px-4 py-2">24/01/2025</td>
                  <td className="px-4 py-2">Accounts</td>
                  <td className="px-4 py-2">
                    Clerk, Account Dept,
                    <br />
                    MMR, SRA Thane
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      Accepted
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <CustomButton variant="warning">View</CustomButton>
                  </td>
                  <td className="px-4 py-2">
                    <CustomButton variant="primary">Download</CustomButton>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">1234567899876541234555</td>
                  <td className="px-4 py-2">सेवा क्र. २</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">15</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">
                    <span className="bg-red-700 text-white px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <CustomButton disabled>View</CustomButton>
                  </td>
                  <td className="px-4 py-2">
                    <CustomButton disabled>Download</CustomButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-4 text-sm">
          <CustomButton variant="secondary">First</CustomButton>
          <CustomButton variant="secondary">Previous</CustomButton>
          <span>Page 1 / 1</span>
          <CustomButton variant="secondary">Last</CustomButton>
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default UserCourse;
