import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UploadForm10 = ({ formData, formId, setCanProceed, onFormSubmit }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === serviceId)
      ?.description || "";

  // State for files and previews
  const [files, setFiles] = useState({
    originalEligibleMemberApplication: null,
    originalEligibleMemberPanCard: null,
    originalEligibleMemberAadhaarCard: null,
    possessionReceiptOriginalEligibleMember: null,
    shareholderCertificateOriginalEligibleMember: null,
    eligibilityListOriginalEligibleMembers: null,
    oathAffidavitOriginalEligibleMember: null,
    institutionNOCOriginalEligibleMember: null,
    buyerAadhaar: null,
    buyerPan: null,
    incomeCertificateForm16: null,
    buyerResidenceCertificate: null,
    aadharCard: null,
    buyerRegisteredDocument: null,
    buyerAffidavit: null,
    signature: null,
    otherDocument1: null,
    otherDocument2: null,
  });

  // State for file previews
  const [previews, setPreviews] = useState({
    originalEligibleMemberApplication: null,
    originalEligibleMemberPanCard: null,
    originalEligibleMemberAadhaarCard: null,
    possessionReceiptOriginalEligibleMember: null,
    shareholderCertificateOriginalEligibleMember: null,
    eligibilityListOriginalEligibleMembers: null,
    oathAffidavitOriginalEligibleMember: null,
    institutionNOCOriginalEligibleMember: null,
    buyerAadhaar: null,
    buyerPan: null,
    incomeCertificateForm16: null,
    buyerResidenceCertificate: null,
    aadharCard: null,

    buyerRegisteredDocument: null,
    buyerAffidavit: null,
    signature: null,
    otherDocument1: null,
    otherDocument2: null,
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
      console.log("Files uploaded successfully:", response.data);
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
        originalEligibleMemberApplication: null,
        originalEligibleMemberPanCard: null,
        originalEligibleMemberAadhaarCard: null,
        possessionReceiptOriginalEligibleMember: null,
        shareholderCertificateOriginalEligibleMember: null,
        eligibilityListOriginalEligibleMembers: null,
        oathAffidavitOriginalEligibleMember: null,
        institutionNOCOriginalEligibleMember: null,
        buyerAadhaar: null,
        buyerPan: null,
        incomeCertificateForm16: null,
        buyerResidenceCertificate: null,
        aadharCard: null,
        buyerRegisteredDocument: null,
        buyerAffidavit: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
      });
      setPreviews({
        originalEligibleMemberApplication: null,
        originalEligibleMemberPanCard: null,
        originalEligibleMemberAadhaarCard: null,
        possessionReceiptOriginalEligibleMember: null,
        shareholderCertificateOriginalEligibleMember: null,
        eligibilityListOriginalEligibleMembers: null,
        oathAffidavitOriginalEligibleMember: null,
        institutionNOCOriginalEligibleMember: null,
        buyerAadhaar: null,
        buyerPan: null,
        incomeCertificateForm16: null,
        buyerResidenceCertificate: null,
        aadharCard: null,
        buyerRegisteredDocument: null,
        buyerAffidavit: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.statusText ||
          "Error uploading files"
      );
      console.error("Upload error----:", err.response?.statusText);

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
      <div className="min-h-screen w-full bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold mb-6">
            सेवा क्र. १० {serviceDescription}
          </div>

          <div
            className="w-100 d-flex justify-content-center flex-column align-items-start rounded mb-4"
            style={{ border: "1px solid" }}
          >
            <p className="p-4 font-bold">मूळ पात्र सभासद</p>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 p-3 w-100">
              {/* Aadhar Card Upload */}
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासदाचा अर्ज
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="originalEligibleMemberApplication"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "originalEligibleMemberApplication")
                    }
                  />
                  <label
                    htmlFor="originalEligibleMemberApplication"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.originalEligibleMemberApplication && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected: {files.originalEligibleMemberApplication.name}
                      </p>
                      {previews.originalEligibleMemberApplication && (
                        <img
                          src={previews.originalEligibleMemberApplication}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद पॅन कार्ड
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="originalEligibleMemberPanCard"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "originalEligibleMemberPanCard")
                    }
                  />
                  <label
                    htmlFor="originalEligibleMemberPanCard"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.originalEligibleMemberPanCard && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected: {files.originalEligibleMemberPanCard.name}
                      </p>
                      {previews.originalEligibleMemberPanCard && (
                        <img
                          src={previews.originalEligibleMemberPanCard}
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
                  मूळ पात्र सभासद आधार कार्ड
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="originalEligibleMemberAadhaarCard"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "originalEligibleMemberAadhaarCard")
                    }
                  />
                  <label
                    htmlFor="originalEligibleMemberAadhaarCard"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.originalEligibleMemberAadhaarCard && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected: {files.originalEligibleMemberAadhaarCard.name}
                      </p>
                      {previews.originalEligibleMemberAadhaarCard && (
                        <img
                          src={previews.originalEligibleMemberAadhaarCard}
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
                  मूळ पात्र सभासद ताबापावती
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="possessionReceiptOriginalEligibleMember"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "possessionReceiptOriginalEligibleMember"
                      )
                    }
                  />
                  <label
                    htmlFor="possessionReceiptOriginalEligibleMember"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.possessionReceiptOriginalEligibleMember && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.possessionReceiptOriginalEligibleMember.name}
                      </p>
                      {previews.possessionReceiptOriginalEligibleMember && (
                        <img
                          src={previews.possessionReceiptOriginalEligibleMember}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद भागधारक प्रमाणपत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="shareholderCertificateOriginalEligibleMember"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "shareholderCertificateOriginalEligibleMember"
                      )
                    }
                  />
                  <label
                    htmlFor="shareholderCertificateOriginalEligibleMember"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.shareholderCertificateOriginalEligibleMember && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {
                          files.shareholderCertificateOriginalEligibleMember
                            .name
                        }
                      </p>
                      {previews.shareholderCertificateOriginalEligibleMember && (
                        <img
                          src={
                            previews.shareholderCertificateOriginalEligibleMember
                          }
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद पात्रता यादी
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="eligibilityListOriginalEligibleMembers"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "eligibilityListOriginalEligibleMembers"
                      )
                    }
                  />
                  <label
                    htmlFor="eligibilityListOriginalEligibleMembers"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.eligibilityListOriginalEligibleMembers && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.eligibilityListOriginalEligibleMembers.name}
                      </p>
                      {previews.eligibilityListOriginalEligibleMembers && (
                        <img
                          src={previews.eligibilityListOriginalEligibleMembers}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद प्रतिज्ञा पत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="oathAffidavitOriginalEligibleMember"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "oathAffidavitOriginalEligibleMember")
                    }
                  />
                  <label
                    htmlFor="oathAffidavitOriginalEligibleMember"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.oathAffidavitOriginalEligibleMember && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.oathAffidavitOriginalEligibleMember.name}
                      </p>
                      {previews.oathAffidavitOriginalEligibleMember && (
                        <img
                          src={previews.oathAffidavitOriginalEligibleMember}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद संस्थेचे नाहरकत प्रमाणपत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="institutionNOCOriginalEligibleMember"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "institutionNOCOriginalEligibleMember"
                      )
                    }
                  />
                  <label
                    htmlFor="institutionNOCOriginalEligibleMember"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.institutionNOCOriginalEligibleMember && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.institutionNOCOriginalEligibleMember.name}
                      </p>
                      {previews.institutionNOCOriginalEligibleMember && (
                        <img
                          src={previews.institutionNOCOriginalEligibleMember}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*2nd div Upload */}

          <div className="w-100 mb-4" style={{ border: "1px solid" }}>
            <p className="p-4 font-bold">खरेदीदार</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
              {/* Aadhar Card Upload */}
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  खरेदीदार आधार कार्ड
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="buyerAadhaar"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "buyerAadhaar")}
                  />
                  <label
                    htmlFor="buyerAadhaar"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.buyerAadhaar && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.buyerAadhaar.name}</p>
                      {previews.buyerAadhaar && (
                        <img
                          src={previews.buyerAadhaar}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  खरेदीदार पॅन कार्ड
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="buyerPan"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "buyerPan")}
                  />
                  <label
                    htmlFor="buyerPan"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.buyerPan && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.buyerPan.name}</p>
                      {previews.buyerPan && (
                        <img
                          src={previews.buyerPan}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  उत्पन्नाचा दाखला/फॉर्म १६
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="incomeCertificateForm16"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "incomeCertificateForm16")
                    }
                  />
                  <label
                    htmlFor="incomeCertificateForm16"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.incomeCertificateForm16 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.incomeCertificateForm16.name}</p>
                      {previews.incomeCertificateForm16 && (
                        <img
                          src={previews.incomeCertificateForm16}
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
                  खरेदीदार नौदणीकृत दस्ताऐवज
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="buyerResidenceCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "buyerResidenceCertificate")
                    }
                  />
                  <label
                    htmlFor="buyerResidenceCertificate"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.buyerResidenceCertificate && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.buyerResidenceCertificate.name}</p>
                      {previews.buyerResidenceCertificate && (
                        <img
                          src={previews.buyerResidenceCertificate}
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
                  खरेदीदार वास्तव्याचा दाखला
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="buyerRegisteredDocument"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "buyerRegisteredDocument")
                    }
                  />
                  <label
                    htmlFor="buyerRegisteredDocument"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.buyerRegisteredDocument && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.buyerRegisteredDocument.name}</p>
                      {previews.buyerRegisteredDocument && (
                        <img
                          src={previews.buyerRegisteredDocument}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Aadhar Card Upload */}
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  खरेदीदार प्रतिज्ञापत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="buyerAffidavit"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "buyerAffidavit")}
                  />
                  <label
                    htmlFor="buyerAffidavit"
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
                    </div>
                  </label>
                  {files.buyerAffidavit && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.buyerAffidavit.name}</p>
                      {previews.buyerAffidavit && (
                        <img
                          src={previews.buyerAffidavit}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*3rd div */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
            {/* Aadhar Card Upload */}
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

            <div className="space-y-2">
              <label className="flex items-start text-sm font-medium text-gray-700">
                <span className="text-red-500 mr-1">*</span>
                इतर कागद पत्रे
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="otherDocument2"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "otherDocument2")}
                />
                <label
                  htmlFor="otherDocument2"
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
                {files.otherDocument2 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.otherDocument2.name}</p>
                    {previews.otherDocument2 && (
                      <img
                        src={previews.otherDocument2}
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
                  id="otherDocument1"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "otherDocument1")}
                />
                <label
                  htmlFor="otherDocument1"
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
                {files.otherDocument1 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected: {files.otherDocument1.name}</p>
                    {previews.otherDocument1 && (
                      <img
                        src={previews.otherDocument1}
                        alt="Preview"
                        className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
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

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !Object.values(files).some((file) => file)}
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
  );
};

export default UploadForm10;
