import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect, useImperativeHandle } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DashboardForm13 = ({ setCanProceed, onFormSubmit, ref }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === serviceId)
      ?.description || "";

  const [formData, setFormData] = useState({
    name: "",
    applyDate: "",
    phone: "",
    address: "",
    taluka: "",
    mouje: "",
    apartmentNo: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useImperativeHandle(ref, () => ({
    setSuccessMsg(data) {
      setSuccessMessage(data);
    },
    setErrorMsg(data) {
      setErrorMessage(data);
    },
    setIsSubmit(data) {
      setIsSubmitting(data);
    },
  }));
  // Check for existing submission
  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserId");
    if (storedUserId) {
      setCanProceed(true);
      setSuccessMessage(
        "You have already submitted this form. You can proceed to the next step."
      );
    }
  }, [setCanProceed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (serviceId) {
      // Find the service in services.json
      const service = servicesData[0].services.find((s) => s.id === serviceId);
      if (service) {
        // Update the formData with the department from services.json
        setFormData((prev) => ({
          ...prev,
          department: service.department,
          // Set the schemeDeveloper based on the department
          schemeDeveloper: service.department,
        }));
      }
    }
  }, [serviceId, setFormData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    const submitData = { ...formData };
    try {
      console.log("form 13 ", submitData);

      onFormSubmit(submitData);

      //   const config = {
      // //     headers: {
      // //       "Content-Type": "application/json",
      // //     },
      // //     withCredentials: true,
      // //   };
      // //   const response = await axios.post(
      // //     "/api/v1/users/create-certified-ren-deposit-copies",
      // //     formData,
      // //     config
      // //   );
      // //   if (onFormSubmit && response.data?.data) {
      // //     onFormSubmit(response.data.data);
      // //   }
      // //   setSuccessMessage("Form submitted successfully!");
      // //   setCanProceed(true);
      // // } catch (error) {
      // //   console.error("Error:", error);
      // //   setErrorMessage(
      // //     error.response?.data?.message ||
      // //       "An error occurred while submitting the form"
      // //   );
      // //   setCanProceed(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-0 py-0 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
        <div className="bg-blue-900 text-white text-center p-2 rounded text-sm font-semibold">
          सेवा क्र. {serviceId} {serviceDescription}
        </div>
        <p className="text-center text-sm text-gray-700 mt-2">
          (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा नमुना)
        </p>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
            {successMessage}
          </div>
        )}

        <form
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-medium mb-1">
              नाव <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              दिनांक <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="applyDate"
              value={formData.applyDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              मोबाईल नं. <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              पत्ता <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              सहकारी गृह संस्था <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              सदनिका क्र. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="apartmentNo"
              value={formData.apartmentNo}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardForm13;
