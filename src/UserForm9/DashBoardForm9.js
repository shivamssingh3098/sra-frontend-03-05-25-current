import CONFIG from "../app.config"; // adjust path as needed
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import servicesData from "../data/services.json";
import MuncipalCooperation from "./MuncipalCooperation";
import BhukhandForm from "./DhukanForm";
import WordForm from "./WordForm";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DEPARTMENT = ["AD", "TPD", "CSD", "COD", "EMD", "TVD", "CAD", "ED"];

const CITY_COUNCIL = [
  "AMBERNATH",
  "KULGAON-BADLAPUR",
  "ALIBAG",
  "PEN",
  "ULHASNAGAR",
  "KHOPOLI",
  "MATHERAN",
  "KARJAT",
  "PALGHAR",
];

const MUNICIPAL_CORPORATIONS = [
  "MUMBAI",
  "THANE",
  "NAVI MUMBAI",
  "PUNE",
  "NAGPUR",
  "NASHIK",
  "AURANGABAD",
  "SOLAPUR",
  "KOLHAPUR",
  "SANGLI",
  "SATARA",
  "RATNAGIRI",
  "AHMEDNAGAR",
  "JALGAON",
  "DHULE",
  "NANDURBAR",
  "BHIWANDI-NIZAMAPUR",
  "MIRAJ-SANGLI",
  "LATUR",
  "OSMANABAD",
  "NANDED",
  "PARBHANI",
  "HINGOLI",
  "JALNA",
  "BEED",
];

const VILLAGE_COUNCIL = [
  "ALIBAG",
  "PEN",
  "MURUD",
  "ROHA",
  "MAHAD",
  "MAHABALESHWAR",
  "WAI",
  "KARAD",
  "KAGAL",
  "KUDAL",
  "RATNAGIRI",
  "CHIPLUN",
  "SAWANTWADI",
  "VENGURLA",
  "KANKAVLI",
  "KOLHAPUR",
  "ICHALKARANJI",
  "SANGLI",
  "MIRAJ",
  "KUPWAD",
  "TASGAON",
  "KARVE NAGAR",
  "KARVE ROAD",
  "KARVE PETH",
  "KARVE VIHAR",
];

const DashBoardForm9 = forwardRef(
  ({ nextStage, prevStage, setCanProceed, onFormSubmit }, ref) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceId = parseInt(queryParams.get("serviceId"));

    const [formData, setFormData] = useState({
      name: "",
      applyDate: "",
      phone: "",
      address: "",
      city: "",
      taluka: "",
      village: "",
      villageCouncil: "",
      cityCouncil: "",
      municipalCorporation: "",
      department: "",
      governmentServiceBranch: "",
      sectorNo: "",
      hutNo: "",
      landNumber: "",
      surveyNo: "",
      finalPlot: "",
      mouje: "",
      bhukhandType: "",
      bhukhandNo: "",
      wardType: "",
      palikaType: "",
      nagarpalika: "",
      WordNo: "",
      schemeDeveloper: "",
      apartmentNo: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userId, setUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [governmentServiceBranches, setGovernmentServiceBranches] = useState(
      []
    );
    const [isLoadingBranches, setIsLoadingBranches] = useState(false);
    const [branchError, setBranchError] = useState("");

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

    // Check if we already have a userId from localStorage
    useEffect(() => {
      const storedUserId = localStorage.getItem("currentUserId");
      if (storedUserId) {
        setUserId(storedUserId);
        setCanProceed(true);
        setSuccessMessage(
          "You have already submitted this form. You can proceed to the next step."
        );
      }
    }, [setCanProceed]);

    useEffect(() => {
      if (serviceId) {
        // Find the service in services.json
        const service = servicesData[0].services.find(
          (s) => s.id === serviceId
        );
        if (service) {
          // Update the formData with the department from services.json
          setFormData((prev) => ({
            ...prev,
            department: service.department,
            // Set the schemeDeveloper based on the department
            // schemeDeveloper: service.department,
          }));
        }
      }
    }, [serviceId, setFormData]);

    // Fetch government service branches from API

    const handleChange = (e) => {
      const { name, value } = e.target;

      // Special handling for council type selection
      if (name === "palikaType") {
        // Reset all council fields when changing palika type
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          villageCouncil: "",
          cityCouncil: "",
          municipalCorporation: "",
        }));
      } else if (name === "villageCouncil") {
        // If selecting village council, clear other council fields
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          cityCouncil: "",
          municipalCorporation: "",
        }));
      } else if (name === "cityCouncil") {
        // If selecting city council, clear other council fields
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          villageCouncil: "",
          municipalCorporation: "",
        }));
      } else if (name === "municipalCorporation") {
        // If selecting municipal corporation, clear other council fields
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          villageCouncil: "",
          cityCouncil: "",
        }));
      } else {
        // Normal field update
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrorMessage("");

      // Validate that at least one of the required fields is present
      if (!formData.landNumber && !formData.surveyNo && !formData.finalPlot) {
        setErrorMessage("Please select a bhukhand type and enter a number.");
        setIsSubmitting(false);
        return;
      }

      // Validate that at least one council type is selected
      if (
        !formData.municipalCorporation &&
        !formData.cityCouncil &&
        !formData.villageCouncil
      ) {
        setErrorMessage("Please select a council type and enter a value.");
        setIsSubmitting(false);
        return;
      }

      // Create a copy of formData to modify
      const submitData = { ...formData };

      // Remove empty council fields to avoid validation errors
      if (!submitData.municipalCorporation)
        delete submitData.municipalCorporation;
      if (!submitData.cityCouncil) delete submitData.cityCouncil;
      if (!submitData.villageCouncil) delete submitData.villageCouncil;
      onFormSubmit(submitData);
      // // Log the data being sent
      // console.log("Submitting form data:", submitData);

      // // Add axios configuration
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true,
      // };

      // const response = await axios.post(
      //   "/api/v1/users/create-certified-ren-deposit-copies",
      //   submitData,
      //   config
      // );

      // console.log("API Response:", response);

      // Pass the response data back to parent
      // if (onFormSubmit && response.data && response.data.data) {
      //   onFormSubmit(response.data.data);
      // }

      // setSuccessMessage("Form submitted successfully!");
      // setCanProceed(true);
    };

    const serviceDescription =
      servicesData[0].services.find((service) => service.id === serviceId)
        ?.description || "";

    return (
      <div>
        <div className="min-h-screen bg-gray-50 px-0 py-0 flex justify-center items-center">
          <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
              सेवा क्र. {serviceId} {serviceDescription}
            </div>
            <p className="text-center text-sm text-gray-700 mt-2">
              (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा
              नमुना)
            </p>

            {/* Show error/success messages */}
            {/* {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
                {successMessage}
              </div>
            )} */}

            {/* Progress / Step Tracker */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-blue-700 font-bold">मूलभूत माहिती</p>
              <div className="border border-black px-4 py-1 text-sm">
                ₹ २६/- फी
              </div>
            </div>

            {/* Form */}
            <form
              className={`mt-6 text-sm ${
                window.innerWidth < 768
                  ? "flex flex-col gap-4"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              }`}
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  नाव <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Date */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  दिनांक <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="applyDate"
                  placeholder="Date"
                  value={formData.applyDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Mobile */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  मोबाईल नं. <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  पत्ता <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Taluka */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  तालुका <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="taluka"
                  placeholder="Taluka"
                  value={formData.taluka}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Bhukhand */}
              <div className="flex-1 md:col-span-3">
                <BhukhandForm formData={formData} setFormData={setFormData} />
              </div>

              {/* Mouje */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  मौजे <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* District */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  जिल्हा <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="District Name"
                  value={formData.city}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              {/* Ward */}
              <WordForm formData={formData} setFormData={setFormData} />

              {/* Nagarpalika */}
              <MuncipalCooperation
                formData={formData}
                setFormData={setFormData}
              />

              {/* Scheme Developer */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  योजनेचे विकासक <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="schemeDeveloper"
                  value={formData.schemeDeveloper}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                  // readOnly
                />
              </div>

              {/* Sarkari - Government Service Branch Dropdown */}
              <div className="flex-1">
                <label className="font-medium block mb-1">
                  सहकारी गृह संस्था <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="governmentServiceBranch"
                  value={formData.governmentServiceBranch}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="font-medium block mb-1">
                  पुनर्वसन योजनेचा अनु क्र{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="redevelopmentServicesNo"
                  value={formData.redevelopmentServicesNo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="font-medium block mb-1">
                  झोपडी क्र.<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hutNo"
                  value={formData.hutNo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="font-medium block mb-1">
                  पुनर्वसनासाठी सोडतीचे दिनांक{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="redevelopmentLeavingDate"
                  value={formData.redevelopmentLeavingDate}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="font-medium block mb-1">
                  सदनिका क्र. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="apartmentNo"
                  value={formData.apartmentNo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="col-span-3 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors mr-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
            <div className="w-full mt-6">
              <p className="text-red-600 font-semibold text-sm text-center">
                (अर्जदारकडे काही कागद पत्रे असल्यास त्यांच्या छायांकित प्रत सोबत
                अपलोड करावे)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DashBoardForm9;
