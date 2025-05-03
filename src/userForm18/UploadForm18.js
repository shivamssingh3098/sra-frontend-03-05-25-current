import React, { useState, useEffect } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import CONFIG from "../app.config"; // adjust path as needed

const UploadForm1 = ({ formData, formId, setCanProceed, onFormSubmit }) => {
  const serviceDescription =
    servicesData[0].services.find((service) => service.id === 1)?.description ||
    "";

  // State for files and previews
  const [files, setFiles] = useState({
    specifiedApplicationFormat: null,
    deathCertificateHusbandWifeSonDaughter: null,
    originalEligibleMemberAadhaarCard: null,
    ownVoterIDCard: null,
    voterIDFamilyMembers: null,
    rationCardNo: null,
    certifiedTrueCopyAnnexure2: null,
    electricityBill: null,
    affidavit: null,
    certifiedNOCFromCooperativeHousingSociety: null,
    aadharCard: null,
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
    specifiedApplicationFormat: null,
    deathCertificateHusbandWifeSonDaughter: null,
    originalEligibleMemberAadhaarCard: null,
    ownVoterIDCard: null,
    voterIDFamilyMembers: null,
    rationCardNo: null,
    certifiedTrueCopyAnnexure2: null,
    electricityBill: null,
    affidavit: null,
    certifiedNOCFromCooperativeHousingSociety: null,
    aadharCard: null,
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
        specifiedApplicationFormat: null,
        deathCertificateHusbandWifeSonDaughter: null,
        originalEligibleMemberAadhaarCard: null,
        ownVoterIDCard: null,
        voterIDFamilyMembers: null,
        rationCardNo: null,
        certifiedTrueCopyAnnexure2: null,
        electricityBill: null,
        affidavit: null,
        certifiedNOCFromCooperativeHousingSociety: null,
        aadharCard: null,
        buyerResidenceCertificate: null,
        aadharCard: null,
        buyerRegisteredDocument: null,
        buyerAffidavit: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
      });
      setPreviews({
        specifiedApplicationFormat: null,
        deathCertificateHusbandWifeSonDaughter: null,
        originalEligibleMemberAadhaarCard: null,
        ownVoterIDCard: null,
        voterIDFamilyMembers: null,
        rationCardNo: null,
        certifiedTrueCopyAnnexure2: null,
        electricityBill: null,
        affidavit: null,
        certifiedNOCFromCooperativeHousingSociety: null,
        aadharCard: null,
        buyerResidenceCertificate: null,
        aadharCard: null,
        buyerRegisteredDocument: null,
        buyerAffidavit: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
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
                  विवहीत नमुन्यातील अर्ज
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="specifiedApplicationFormat"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "specifiedApplicationFormat")
                    }
                  />
                  <label
                    htmlFor="specifiedApplicationFormat"
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
                  {files.specifiedApplicationFormat && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.specifiedApplicationFormat.name}</p>
                      {previews.specifiedApplicationFormat && (
                        <img
                          src={previews.specifiedApplicationFormat}
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
                  पती/पत्नी/मुलगा मुलगी च मृत्यू च दाखला
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="deathCertificateHusbandWifeSonDaughter"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "deathCertificateHusbandWifeSonDaughter"
                      )
                    }
                  />
                  <label
                    htmlFor="deathCertificateHusbandWifeSonDaughter"
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
                  {files.deathCertificateHusbandWifeSonDaughter && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.deathCertificateHusbandWifeSonDaughter.name}
                      </p>
                      {previews.deathCertificateHusbandWifeSonDaughter && (
                        <img
                          src={previews.deathCertificateHusbandWifeSonDaughter}
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
                  मतदार यादी /मतदार ओळखपत्र
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
                  स्वत:चे मतदार ओळखपत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="ownVoterIDCard"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "ownVoterIDCard")}
                  />
                  <label
                    htmlFor="ownVoterIDCard"
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
                  {files.ownVoterIDCard && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.ownVoterIDCard.name}</p>
                      {previews.ownVoterIDCard && (
                        <img
                          src={previews.ownVoterIDCard}
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
                  पती/पत्नी / मुलगा मुलगी मतदार ओळखपत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="voterIDFamilyMembers"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "voterIDFamilyMembers")
                    }
                  />
                  <label
                    htmlFor="voterIDFamilyMembers"
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
                  {files.voterIDFamilyMembers && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.voterIDFamilyMembers.name}</p>
                      {previews.voterIDFamilyMembers && (
                        <img
                          src={previews.voterIDFamilyMembers}
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
                  शिधापत्रिका क्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="rationCardNo"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "rationCardNo")}
                  />
                  <label
                    htmlFor="rationCardNo"
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
                  {files.rationCardNo && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.rationCardNo.name}</p>
                      {previews.rationCardNo && (
                        <img
                          src={previews.rationCardNo}
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
                  प्रमाणित परिशिष्ट -२ ची सत्यप्रत
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="certifiedTrueCopyAnnexure2"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "certifiedTrueCopyAnnexure2")
                    }
                  />
                  <label
                    htmlFor="certifiedTrueCopyAnnexure2"
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
                  {files.certifiedTrueCopyAnnexure2 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.certifiedTrueCopyAnnexure2.name}</p>
                      {previews.certifiedTrueCopyAnnexure2 && (
                        <img
                          src={previews.certifiedTrueCopyAnnexure2}
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
                  वीज बिल
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="electricityBill"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "electricityBill")}
                  />
                  <label
                    htmlFor="electricityBill"
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
                  {files.electricityBill && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.electricityBill.name}</p>
                      {previews.electricityBill && (
                        <img
                          src={previews.electricityBill}
                          alt="Preview"
                          className="mt-2 max-w-full sm:max-w-xs rounded mx-auto"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
              {/* Aadhar Card Upload */}
              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  प्रतिज्ञापत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="affidavit"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "affidavit")}
                  />
                  <label
                    htmlFor="affidavit"
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
                  {files.affidavit && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.affidavit.name}</p>
                      {previews.affidavit && (
                        <img
                          src={previews.affidavit}
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
                  प्रमाणित सहकारी गृहनिर्माण संस्थेचे ना हरकत प्रमाणपत्र
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="certifiedNOCFromCooperativeHousingSociety"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "certifiedNOCFromCooperativeHousingSociety"
                      )
                    }
                  />
                  <label
                    htmlFor="certifiedNOCFromCooperativeHousingSociety"
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
                  {files.certifiedNOCFromCooperativeHousingSociety && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.certifiedNOCFromCooperativeHousingSociety.name}
                      </p>
                      {previews.certifiedNOCFromCooperativeHousingSociety && (
                        <img
                          src={
                            previews.certifiedNOCFromCooperativeHousingSociety
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
                  आधार कार्ड .
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="aadharCard"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "aadharCard")}
                  />
                  <label
                    htmlFor="aadharCard"
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
                  {files.aadharCard && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.aadharCard.name}</p>
                      {previews.aadharCard && (
                        <img
                          src={previews.aadharCard}
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
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
                      <p className="text-xs">
                        PDF, JPG, JPEG or PNG (max. 2MB)
                      </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm1;
