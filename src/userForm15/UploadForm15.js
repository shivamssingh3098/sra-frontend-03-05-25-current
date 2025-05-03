import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from "react";
import servicesData from "../data/services.json";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UploadForm15 = ({ formData, formId, setCanProceed, onFormSubmit }) => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  const serviceDescription =
    servicesData[0].services.find((service) => service.id === serviceId)?.description ||
    "";

  // State for files and previews
  const [files, setFiles] = useState({
    aadharCard: null,
    signature: null,
    otherDocument1: null,
    otherDocument2: null,
    annexure3_4: null,
    formASelfDeclaration: null,
    voterIDCardElectorList: null,
    electricityBill: null,
    slumEnumerationForm: null,
    propertyTaxReceipt: null,
    nonAgriculturalTaxPenaltyReceipt: null,
    duplicateGumastaLicense: null,
   
  });

  // State for file previews
  const [previews, setPreviews] = useState({
    aadharCard: null,
    signature: null,
    otherDocument1: null,
    otherDocument2: null,
    annexure3_4: null,
    formASelfDeclaration: null,
    voterIDCardElectorList: null,
    electricityBill: null,
    slumEnumerationForm: null,
    propertyTaxReceipt: null,
    nonAgriculturalTaxPenaltyReceipt: null,
    duplicateGumastaLicense: null,

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
        `https://sra-government-project-thane-1.onrender.com/api/v1/users/documents-upload?id=${userId}`,
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
        aadharCard: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
        annexure3_4: null,
        formASelfDeclaration: null,
        voterIDCardElectorList: null,
        electricityBill: null,
        slumEnumerationForm: null,
        propertyTaxReceipt: null,
        nonAgriculturalTaxPenaltyReceipt: null,
        duplicateGumastaLicense: null,
        aadharCard: null,
        buyerRegisteredDocument: null,
        buyerAffidavit: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
      });
      setPreviews({
        aadharCard: null,
        signature: null,
        otherDocument1: null,
        otherDocument2: null,
        annexure3_4: null,
        formASelfDeclaration: null,
        voterIDCardElectorList: null,
        electricityBill: null,
        slumEnumerationForm: null,
        propertyTaxReceipt: null,
        nonAgriculturalTaxPenaltyReceipt: null,
        duplicateGumastaLicense: null,
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
            सेवा क्र. {serviceId} {serviceDescription}
          </div>

          <div
            className="w-100 d-flex justify-content-center flex-column align-items-start mb-4 gap-3">
            <p className="p-4 font-bold">मूळ पात्र सभासद</p>

            <div className="grid grid-cols-1 md:grid-cols-2 rounded gap-6 p-3 w-100" style={{border:'1px solid black'}}>
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
                    id="aadharCard"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "aadharCard")
                    }
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
                      <p>
                        Selected: {files.aadharCard.name}
                      </p>
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
                  मूळ पात्र सभासद पॅन कार्ड    
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="signature"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "signature")
                    }
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
                      <p>
                        Selected: {files.signature.name}
                      </p>
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
                    id="otherDocument1"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "otherDocument1")
                    }
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
                      <p>
                        Selected: {files.otherDocument1.name}
                      </p>
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
                    id="otherDocument2"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "otherDocument2"
                      )
                    }
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
                      <p>
                        Selected:{" "}
                        {files.otherDocument2.name}
                      </p>
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

              <div className="space-y-2">
                <label className="flex items-start text-sm font-medium text-gray-700">
                  <span className="text-red-500 mr-1">*</span>
                  मूळ पात्र सभासद भागधारक प्रमाणपत्र      
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    id="annexure3_4"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "annexure3_4"
                      )
                    }
                  />
                  <label
                    htmlFor="annexure3_4"
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
                  {files.annexure3_4 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.annexure3_4.name}
                      </p>
                      {previews.annexure3_4 && (
                        <img
                          src={previews.annexure3_4}
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
                    id="formASelfDeclaration"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "formASelfDeclaration"
                      )
                    }
                  />
                  <label
                    htmlFor="formASelfDeclaration"
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
                  {files.formASelfDeclaration && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.formASelfDeclaration.name}
                      </p>
                      {previews.formASelfDeclaration && (
                        <img
                          src={previews.formASelfDeclaration}
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
                    id="voterIDCardElectorList"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "voterIDCardElectorList"
                      )
                    }
                  />
                  <label
                    htmlFor="voterIDCardElectorList"
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
                  {files.voterIDCardElectorList && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Selected:{" "}
                        {files.voterIDCardElectorList.name}
                      </p>
                      {previews.voterIDCardElectorList && (
                        <img
                          src={previews.voterIDCardElectorList}
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
                    id="electricityBill"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        "electricityBill"
                      )
                    }
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
                      <p>
                        Selected:{" "}
                        {files.electricityBill.name}
                      </p>
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

           
         
          {/*2nd div Upload */}

          <div className="grid grid-cols-1 md:grid-cols-2 rounded gap-6 p-3 w-100 mb-5" style={{ border: "1px solid" }}>
        
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
                    id="slumEnumerationForm"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "slumEnumerationForm")}
                  />
                  <label
                    htmlFor="slumEnumerationForm"
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
                  {files.slumEnumerationForm && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.slumEnumerationForm.name}</p>
                      {previews.slumEnumerationForm && (
                        <img
                          src={previews.slumEnumerationForm}
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
                    id="propertyTaxReceipt"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "propertyTaxReceipt")}
                  />
                  <label
                    htmlFor="propertyTaxReceipt"
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
                  {files.propertyTaxReceipt && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.propertyTaxReceipt.name}</p>
                      {previews.propertyTaxReceipt && (
                        <img
                          src={previews.propertyTaxReceipt}
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
                    id="nonAgriculturalTaxPenaltyReceipt"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "nonAgriculturalTaxPenaltyReceipt")
                    }
                  />
                  <label
                    htmlFor="nonAgriculturalTaxPenaltyReceipt"
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
                  {files.nonAgriculturalTaxPenaltyReceipt && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.nonAgriculturalTaxPenaltyReceipt.name}</p>
                      {previews.nonAgriculturalTaxPenaltyReceipt && (
                        <img
                          src={previews.nonAgriculturalTaxPenaltyReceipt}
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
                    id="duplicateGumastaLicense"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileChange(e, "duplicateGumastaLicense")
                    }
                  />
                  <label
                    htmlFor="duplicateGumastaLicense"
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
                  {files.duplicateGumastaLicense && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Selected: {files.duplicateGumastaLicense.name}</p>
                      {previews.duplicateGumastaLicense && (
                        <img
                          src={previews.duplicateGumastaLicense}
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

export default UploadForm15;
