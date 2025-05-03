import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";

const UploadForm1 = ({
  formData: initialFormData,
  formId,
  dashboardData: initialDashboardData,
}) => {
  const location = useLocation();
  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 1)?.description ||
    "";

  const [formData, setFormData] = useState(initialFormData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State for files and previews
  const [files, setFiles] = useState({
    aadharCard: null,
    panCard: null,
    signature: null,
    otherDocument: null,
  });

  // State for file previews
  const [previews, setPreviews] = useState({
    aadharCard: null,
    panCard: null,
    signature: null,
    otherDocument: null,
  });

  // State for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dashboardData, setDashboardData] = useState(
    initialDashboardData || {}
  );

  useEffect(() => {
    // Get data from React Router location state
    if (location.state && location.state.dashboardData) {
      const data = location.state.dashboardData;
      setDashboardData(data);
      setUserId(data._id); // Assuming _id is the user ID in the response
    } else {
      setError(
        "No dashboard data found. Please complete the dashboard form first."
      );
    }
  }, [location]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("dashboardFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setDashboardData(parsedData);
      setUserId(parsedData._id);
    }
  }, []);

  // Handle file change
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError(`${field} file size should be less than 2MB`);
        return;
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        setError(`${field} should be PDF, JPG, JPEG or PNG`);
        return;
      }

      setFiles((prev) => ({
        ...prev,
        [field]: file,
      }));

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setPreviews((prev) => ({
          ...prev,
          [field]: previewUrl,
        }));
      } else {
        setPreviews((prev) => ({
          ...prev,
          [field]: null,
        }));
      }

      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formDataToSend.append(key, files[key]);
        }
      });

      // Add formId to the request
      if (formId) {
        formDataToSend.append("formId", formId);
      }

      const response = await axios.post(
        "/api/v1/users/certified-ren-deposit-copies-upload",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Documents uploaded successfully!");
        // Navigate to the next form or dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Failed to upload documents");
        toast.error(response.data.message || "Failed to upload documents");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload documents");
      toast.error(
        error.response?.data?.message || "Failed to upload documents"
      );
    } finally {
      setLoading(false);
    }
  };

  // Cleanup function for preview URLs
  useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts
      Object.values(previews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Documents
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aadhar Card Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Aadhar Card
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "aadharCard")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previews.aadharCard && (
              <div className="mt-2">
                <img
                  src={previews.aadharCard}
                  alt="Aadhar Card Preview"
                  className="max-h-40 object-contain"
                />
              </div>
            )}
          </div>

          {/* PAN Card Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              PAN Card
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "panCard")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previews.panCard && (
              <div className="mt-2">
                <img
                  src={previews.panCard}
                  alt="PAN Card Preview"
                  className="max-h-40 object-contain"
                />
              </div>
            )}
          </div>

          {/* Signature Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Signature
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "signature")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previews.signature && (
              <div className="mt-2">
                <img
                  src={previews.signature}
                  alt="Signature Preview"
                  className="max-h-40 object-contain"
                />
              </div>
            )}
          </div>

          {/* Other Document Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Other Document
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "otherDocument")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previews.otherDocument && (
              <div className="mt-2">
                <img
                  src={previews.otherDocument}
                  alt="Other Document Preview"
                  className="max-h-40 object-contain"
                />
              </div>
            )}
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex justify-end space-x-4">
            <CustomButton
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </CustomButton>
            <CustomButton type="submit" variant="primary" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm1;
