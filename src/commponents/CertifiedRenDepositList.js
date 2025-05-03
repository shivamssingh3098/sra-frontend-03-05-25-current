import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import axios from "axios";

const CertifiedRenDepositList = () => {
  const [depositCopies, setDepositCopies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formId, setFormId] = useState("");
  const [specificForm, setSpecificForm] = useState(null);
  const [specificLoading, setSpecificLoading] = useState(false);
  const [specificError, setSpecificError] = useState(null);

  useEffect(() => {
    fetchDepositCopies();
  }, []);

  const fetchDepositCopies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(CONFIG.API_BASE_URL +
        "/api/v1/users/certified-ren-deposit-copies-get"
      );
      setDepositCopies(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching deposit copies");
      console.error("Error fetching deposit copies:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificForm = async (e) => {
    e.preventDefault();
    if (!formId) {
      setSpecificError("Please enter a form ID");
      return;
    }

    try {
      setSpecificLoading(true);
      setSpecificError(null);
      const response = await axios.get(CONFIG.API_BASE_URL +
        `/api/v1/users/certified-ren-deposit-copies-get-specific?formId=${formId}`
      );
      setSpecificForm(response.data.data);
      console.log("API Response for specific form:", response.data);
    } catch (err) {
      setSpecificError(
        err.response?.data?.message || "Error fetching specific form"
      );
      console.error("Error fetching specific form:", err);
    } finally {
      setSpecificLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Certified Rent Deposit Copies</h1>

      {/* Form ID Search Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Search by Form ID</h2>
        <form onSubmit={fetchSpecificForm} className="flex gap-2">
          <input
            type="text"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            placeholder="Enter Form ID"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={specificLoading}
          >
            {specificLoading ? "Loading..." : "Search"}
          </button>
        </form>

        {specificError && (
          <div className="mt-2 text-red-500">{specificError}</div>
        )}

        {specificForm && (
          <div className="mt-4 p-4 bg-white rounded border">
            <h3 className="font-semibold mb-2">Form Details:</h3>
            <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(specificForm, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* All Forms Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Form ID</th>
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Apply Date</th>
              <th className="px-6 py-3 border-b text-left">Phone</th>
              <th className="px-6 py-3 border-b text-left">Address</th>
              <th className="px-6 py-3 border-b text-left">Area Type</th>
              <th className="px-6 py-3 border-b text-left">Department</th>
              <th className="px-6 py-3 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {depositCopies.map((copy) => (
              <tr key={copy._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{copy._id}</td>
                <td className="px-6 py-4 border-b">{copy.name}</td>
                <td className="px-6 py-4 border-b">{copy.applyDate}</td>
                <td className="px-6 py-4 border-b">{copy.phone}</td>
                <td className="px-6 py-4 border-b">{copy.address}</td>
                <td className="px-6 py-4 border-b">
                  {copy.municipalCorporation
                    ? "Municipal Corporation"
                    : copy.city
                    ? "City"
                    : "Village"}
                </td>
                <td className="px-6 py-4 border-b">{copy.department}</td>
                <td className="px-6 py-4 border-b">
                  <span
                    className={`px-2 py-1 rounded ${
                      copy.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : copy.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {copy.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertifiedRenDepositList;
