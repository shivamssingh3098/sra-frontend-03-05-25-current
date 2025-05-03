import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UploadForm = ({ formData, formId, setCanProceed, onFormSubmit }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === serviceId)
      ?.description || "";

  // State for files and previews
  const [files, setFiles] = useState({
    identityCard: null,
    panCard: null,
    signature: null,
    otherDocument: null,
  });

  // State for file previews
  const [previews, setPreviews] = useState({
    identityCard: null,
    panCard: null,
    signature: null,
    otherDocument: null,
  });

  // State for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage("");

      // Get user ID from localStorage or use the provided formId
      let userId = formId;
      if (!userId) {
        try {
          const userDataString = localStorage.getItem("userData");
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            console.log("userData", userData);
            userId = userData._id;
          }
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
          setError("Unable to retrieve user information. Please log in again.");
          setIsLoading(false);
          return;
        }
      }

      if (!userId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Create FormData object
      const formDataObj = new FormData();
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formDataObj.append(key, files[key]);
        }
      });
      const token = localStorage.getItem("accessToken");
      // Make API call with user ID as query parameter
      const response = await axios.post(
        `${CONFIG.API_BASE_URL}/api/v1/users/documents-upload?formId=${userId}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      console.log("Files uploaded successfully: 1", response.data);
      setSuccessMessage("Files uploaded successfully!");

      // If onFormSubmit is provided, call it with the response data
      if (onFormSubmit) {
        onFormSubmit(response.data);
      }

      // If setCanProceed is provided, set it to true to allow proceeding to the next step
      if (setCanProceed) {
        setCanProceed(true);
      }

      // Clear form
      setFiles({
        identityCard: null,
        panCard: null,
        signature: null,
        otherDocument: null,
      });
      setPreviews({
        identityCard: null,
        panCard: null,
        signature: null,
        otherDocument: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading files");
      console.error("Upload error:", err);

      // If setCanProceed is provided, set it to false to prevent proceeding
      if (setCanProceed) {
        setCanProceed(false);
      }
    } finally {
      setIsLoading(false);
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
    <div>
      <div className="min-h-screen bg-gray-50 px-0 py-0 flex justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold mb-6">
            सेवा क्र. {serviceId}: {serviceDescription}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aadhar Card Upload */}
            <div className="space-y-2">
              <label className="flex items-start text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                ओळखपत्र
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="identityCard"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "identityCard")}
                />
                <label
                  htmlFor="identityCard"
                  className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                >
                  <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm text-gray-500">
                    <span className="font-medium">Choose from files</span>
                    <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                  </div>
                </label>
                {files.identityCard && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.identityCard.name}</p>
                    {previews.identityCard && (
                      <img
                        src={previews.identityCard}
                        alt="Preview"
                        className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* PAN Card Upload */}
            <div className="space-y-2">
              <label className="flex items-start text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                इतर कागद पत्रे
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="panCard"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "panCard")}
                />
                <label
                  htmlFor="panCard"
                  className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                >
                  <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm text-gray-500">
                    <span className="font-medium">Choose from files</span>
                    <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                  </div>
                </label>
                {files.panCard && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.panCard.name}</p>
                    {previews.panCard && (
                      <img
                        src={previews.panCard}
                        alt="Preview"
                        className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Signature Upload */}
            <div className="space-y-2">
              <label className="flex items-start text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                स्वाक्षरी
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="signature"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "signature")}
                />
                <label
                  htmlFor="signature"
                  className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                >
                  <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm text-gray-500">
                    <span className="font-medium">Choose from files</span>
                    <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                  </div>
                </label>
                {files.signature && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.signature.name}</p>
                    {previews.signature && (
                      <img
                        src={previews.signature}
                        alt="Preview"
                        className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* etc Upload */}
            <div className="space-y-2">
              <label className="flex items-start text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                इतर कागद पत्रे
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="otherDocument"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "otherDocument")}
                />
                <label
                  htmlFor="otherDocument"
                  className="flex items-center gap-2 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors group"
                >
                  <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm text-gray-500">
                    <span className="font-medium">Choose from files</span>
                    <p className="text-xs">PDF, JPG, JPEG or PNG (max. 2MB)</p>
                  </div>
                </label>
                {files.otherDocument && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.otherDocument.name}</p>
                    {previews.otherDocument && (
                      <img
                        src={previews.otherDocument}
                        alt="Preview"
                        className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Guidelines */}
            <div className="md:col-span-2 mt-4 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                फाइल अपलोड मार्गदर्शक सूचना:
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>फाइल साइज 2MB पेक्षा कमी असावी</li>
                <li>फक्त PDF, JPG, JPEG किंवा PNG फॉरमॅट स्वीकारले जातील</li>
                <li>कागदपत्रे स्पष्ट आणि वाचनीय असावीत</li>
              </ul>
            </div>

            {/* Error Message */}
            {error && (
              <div className="md:col-span-2 bg-red-50 text-red-600 p-3 rounded">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="md:col-span-2 bg-green-50 text-green-600 p-3 rounded">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                disabled={
                  isLoading || !Object.values(files).some((file) => file)
                }
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  isLoading || !Object.values(files).some((file) => file)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Uploading..." : "Upload Files"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
