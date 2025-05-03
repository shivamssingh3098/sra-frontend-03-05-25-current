import CONFIG from "../app.config"; // adjust path as needed
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import servicesData from "../data/services.json";
// import MuncipalCooperation from "./MuncipalCooperation";
// import BhukhandForm from "./DhukanForm";
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

const DashboardForm = forwardRef(
  ({ nextStage, prevStage, setCanProceed, onFormSubmit }, ref) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceId = parseInt(queryParams.get("serviceId"));
    console.log("serviceId-----", serviceId);

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
      apartmentNoShopProvidingDate: "",
      transferredThroughAddressName: "",
      municipalCorporation: "",
      department: "",
      governmentServiceBranchAddress: "",
      transferredThroughSaleName: "",
      sectorNo: "",
      wardNo: "",
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
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userId, setUserId] = useState(null);
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
            schemeDeveloper: service.department,
          }));
        }
      }
    }, [serviceId, setFormData]);
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
      console.log("form 10 is this ", formData);
      try {
        // Validate that at least one of the required fields is present
        // if (!formData.landNumber && !formData.surveyNo && !formData.finalPlot) {
        //   setErrorMessage("Please select a bhukhand type and enter a number.");
        //   setIsSubmitting(false);
        //   return;
        // }

        // Validate that at least one council type is selected
        // if (
        //   !formData.municipalCorporation &&
        //   !formData.cityCouncil &&
        //   !formData.villageCouncil
        // ) {
        //   setErrorMessage("Please select a council type and enter a value.");
        //   setIsSubmitting(false);
        //   return;
        // }

        // Create a copy of formData to modify
        const submitData = { ...formData };
        console.log("submitData 10", submitData);

        // Remove empty council fields to avoid validation errors
        if (!submitData.municipalCorporation)
          delete submitData.municipalCorporation;
        if (!submitData.cityCouncil) delete submitData.cityCouncil;
        if (!submitData.villageCouncil) delete submitData.villageCouncil;
        console.log("form 10 is this ", submitData);
        console.log("submit 10 form");
        onFormSubmit(submitData);
        // Log the data being sent
        // console.log("Submitting form data:", submitData);

        // shivam
      } catch (error) {
        console.error("API Error:", error);
        console.error("Error Response:", error.response?.data);
        console.error("Error Status:", error.response?.status);

        if (error.response) {
          setErrorMessage(
            error.response.data.message || "Server error occurred"
          );
        } else if (error.request) {
          setErrorMessage(
            "No response received from server. Please check your connection."
          );
        } else {
          setErrorMessage(
            error.message || "An error occurred while submitting the form"
          );
        }
        setSuccessMessage("");
        setCanProceed(false);
      } finally {
        setIsSubmitting(false);
      }
    };
    // const service =
    //   servicesData[0].services.find((service) => service.id === serviceId) ||
    //   {};
    const serviceDescription =
      servicesData[0].services.find((service) => service.id === serviceId)
        ?.description || "";

    // const serviceDescription = service?.description || "";
    return (
      <div>
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
          <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6">
            {/* Header */}
            <div className="bg-blue-900 text-white text-center p-2 rounded text-sm md:text-base font-semibold">
              सेवा क्र. {serviceId} {serviceDescription}
            </div>
            <p className="text-center text-sm text-gray-700 mt-2">
              (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा
              नमुना)
            </p>

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
              <div>
                <label className="font-medium block mb-1">
                  मूळ झोपडी धारकाच नाव <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="font-medium block mb-1">
                  दिनांक <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="font-medium block mb-1">
                  मोबाईल नं. <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="font-medium block mb-1">
                  पत्ता <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Taluka */}
              <WordForm formData={formData} setFormData={setFormData} />

              {/* Bhukhand */}
              <div>
                <label className="font-medium block mb-1">
                  सरकारी गृह संस्था पत्ता{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="governmentServiceBranchAddress"
                  value={formData.governmentServiceBranchAddress}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              {/* पुनर्वसन योजनेचा दिनांक */}
              <div className="md:col-span-3">
                <label className="font-medium block mb-1">
                  सदनिका / गाळा वाटप करण्यात आलेली तारीख{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="apartmentNoShopProvidingDate"
                  value={formData.apartmentNoShopProvidingDate}
                  onChange={handleChange}
                  className="w-full border rounded px-5 py-2"
                  required
                />
              </div>

              {/* पुनर्वसन योजनेचा अनु क्र */}
              <div className="md:col-span-3">
                <label className="font-medium block mb-1">
                  विक्रीद्वारे हस्तांतर करण्यात येणारी व्यक्ति चे नाव{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="transferredThroughSaleName"
                  value={formData.transferredThroughSaleName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* झोपडी क्र. */}
              <div className="md:col-span-3">
                <label className="font-medium block mb-1">
                  विकरिद्वारे हस्तांतर करण्यात येणारी व्यक्तिचा पत्ता.
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="transferredThroughAddressName"
                  value={formData.transferredThroughAddressName}
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
          </div>
        </div>
      </div>
    );
  }
);

export default DashboardForm;
