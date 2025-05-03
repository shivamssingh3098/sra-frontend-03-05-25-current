import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useRef, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigate, navigate } from "react-router-dom";
import UploadForm from "./UploadForm";
import UploadForm8 from "../UserForm8/UploadForm8";
import DashBoardForm1 from "./DashBoardForm";
import { useLocation } from "react-router-dom";
import UploadForm10 from "../userForm10/UploadForm10";
import UploadForm11 from "../userForm11/UploadForm11";
import UploadForm15 from "../userForm15/UploadForm15";
import UploadForm21 from "../userForm21/UploadForm21";
import UploadForm18 from "../userForm18/UploadForm18";
import DashboardForm from "./DashBoardForm";
import DashboardForm3 from "../UserForm3/DashBoardForm3";
import DashBoardForm9 from "../UserForm9/DashBoardForm9";
import DashBoardForm10 from "../userForm10/DashBoardForm10";
import DashBoardForm13 from "../userForm13/DashBoardForm13";
import DashboardForm15 from "../userForm15/DashBoardForm15";
import DashboardForm16 from "../userForm16/DashBoardForm16";
import DashboardForm17 from "../userForm17/DashBoardForm17";
import DashboardForm18 from "../userForm18/DashBoardForm18";
import DashBoardForm12 from "../userForm12/DashBoardForm12";
import axios from "axios";

// Import Form components
import Form1 from "../UserForm1/Form1";
import Form2 from "../UserForm2/Form2";
import Form3 from "../UserForm3/Form3";
import Form4 from "../UserForm4/Form4";
import Form5 from "../UserForm5/Form5";
import Form6 from "../UserForm6/Form6";
import Form7 from "../UserForm7/Form7";
import Form8 from "../UserForm8/Form8";
import Form9 from "../UserForm9/Form9";
import Form10 from "../userForm10/Form10";
import Form11 from "../userForm11/Form11";
import Form12 from "../userForm12/Form12";
import Form13 from "../userForm13/Form13";
import Form14 from "../userForm14/Form14";
import Form15 from "../userForm15/Form15";
import Form16 from "../userForm16/Form16";
import Form17 from "../userForm17/Form17";
import Form18 from "../userForm18/Form18";
import Form19 from "../userForm19/Form19";
import Form20 from "../userForm20/Form20";
import Form21 from "../userForm21/Form21";
import Form22 from "../userForm22/Form22";
import DashboardForm8 from "../UserForm8/DashBoardForm8";

const stages = ["मूलभूत माहिती", "कागदपत्रे", "प्रमाणपत्र"];

const StageTracker = ({ currentStage }) => {
  return (
    <div className="flex justify-around items-center mb-6">
      {stages.map((stage, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
              index === currentStage
                ? "bg-blue-600"
                : "border-2 border-blue-600 text-blue-600"
            }`}
          >
            {index + 1}
          </div>
          <p className="mt-2 text-sm text-center">{stage}</p>
        </div>
      ))}
    </div>
  );
};

const CertificateStage = ({ formData }) => (
  <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
      {/* Certificate Header */}
      <div className="text-center mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-left">सेवा क्र.१</div>
          <CustomButton variant="primary" className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </CustomButton>
        </div>
        <p className="text-sm mb-4">
          (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा नमुना)
        </p>

        {/* Photo Box */}
        <div className="flex justify-end mb-4">
          <div className="border border-gray-400 w-24 h-32 flex items-center justify-center text-gray-400 text-xs">
            ₹ १० चे कोर्ट फी
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="space-y-6 text-sm">
        <div className="flex flex-col space-y-2">
          <div className="flex">
            <span className="w-24">अर्जदाराचे नाव</span>
            <span className="mx-2">:</span>
            <span className="flex-1 border-b border-gray-300">
              {formData.name || "_____________"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24">पत्ता</span>
            <span className="mx-2">:</span>
            <span className="flex-1 border-b border-gray-300">
              {formData.address || "_____________"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24">मोबाईल क्र.</span>
            <span className="mx-2">:</span>
            <span className="flex-1 border-b border-gray-300">
              {formData.mobile || "_____________"}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-4">प्रति,</p>
          <div className="ml-8 space-y-1">
            <p>मा.विभागीय</p>
            <p>सेवा विभाग</p>
            <p>कृषि विभागन दालन</p>
            <p>कोपरखैरणे, मुंबई-४००७०९</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="font-medium mb-4">
            विषय :- भाडे-परिपत्रक क्र.१ नुसार महसूल विभागाच्या आदेशानुसार
            झोपडपट्टीधारकाच्या बँक खात्यावर भाडे प्रदान तपशीलाच्या प्रमाणित
            प्रती देणेबाबत.
          </p>

          <p className="mb-4">महोदय,</p>

          <div className="space-y-4">
            <p>
              मी निवासी अनुज्ञप्ती क्र.{formData.wardNo || "_______"}{" "}
              {formData.nagarpalika || "_______"} तालुका{" "}
              {formData.taluka || "_______"} जिल्हा{" "}
              {formData.district || "_______"} येथील{" "}
              {formData.mouje || "_______"} मधील गाळा क्र.{" "}
              {formData.bhukhandNo || "_______"} चा दिनांक{" "}
              {formData.date || "_______"} पासून भोगवटादार आहे.
            </p>

            <p>
              आपल्या विभागाने क्र.४१ नुसार झोपडपट्टीधारकाच्या बँक खात्यावर भाडे
              प्रदान तपशीलाच्या प्रमाणित प्रती व महानगरपालिकेच्या
              झोपडपट्टीधारकाच्या बँक खात्यावर भाडे प्रदान तपशीलाच्या प्रमाणित
              प्रती मागणी केली आहे.
            </p>
          </div>
        </div>

        {/* Guidelines */}
        <div className="mt-8 space-y-2 text-sm">
          <p className="font-medium">टीप :-</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              सदर अर्जासोबत रु. १०/- किंमतीचे कोर्ट फी स्टॅम्प, विहीत नमुना सर्व
              कागद आवश्यक विभागाकडे सादर करावा.
            </li>
            <li>
              व्यक्तिगत अर्जदाराने स्वतःचा पान क्रमांकीत अर्जदाराच्या
              स्वाक्षरीची पुरावा व इतर प्रमाणपत्र रु. २५/- प्रमाणे स्वाक्षरीत
              करावी.
            </li>
            <li>
              संबंधित कागदपत्रे सत्यता पडताळणी, सर्व माहितीची खात्री झाल्याशिवाय
              त्यावर कारवाई केली जाणार नाहीत.
            </li>
          </ol>
        </div>

        {/* Signature Section */}
        <div className="mt-12 flex justify-end">
          <div className="text-center">
            <div className="w-40 h-20 border-b border-gray-400"></div>
            <p className="mt-2">(अर्जदाराची स्वाक्षरी)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ApplicationForm = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [depositData, setDepositData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);
  const navigate = useNavigate();
  const childRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  const [formData, setFormData] = useState({
    serviceNumber: serviceId,
    _id: "",
    name: "",
    date: "",
    address: "",
    mobile: "",
    taluka: "",
    bhukhandNo: "",
    mouje: "",
    district: "",
    wardNo: "",
    nagarpalika: "",
    village: "",
    schemeDeveloper: "",
    governmentServiceBranch: "",
  });
  const [applicationData, setApplicationData] = useState();
  const [canProceed, setCanProceed] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (submitData) => {
    try {
      // Add serviceNumber to the submitData if it's not already there
      if (!submitData.serviceNumber) {
        submitData.serviceNumber = serviceId;
      }

      // Log the data being sent
      console.log(
        "Form testing : Basic form submit done and response -",
        submitData
      );

      // Add axios configuration
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      };

      const response = await axios.post(
        CONFIG.API_BASE_URL + "/api/v1/users/create-common-form",
        submitData,
        config
      );
      if (response.data && response.data.data) {
        console.log("API Response:", response);
        console.log("Form submitted with data:", response.data.data);
        if (response.data.data && response.data.data._id) {
          // Determine which bhukhand type was selected
          let bhukhandNo = "";
          if (response.data.data.surveyNo) {
            bhukhandNo = response.data.data.surveyNo;
          } else if (response.data.data.finalPlot) {
            bhukhandNo = response.data.data.finalPlot;
          } else if (response.data.data.landNumber) {
            bhukhandNo = response.data.data.landNumber;
          }

          // Determine which ward type was selected
          let wardNo = "";
          if (response.data.data.sectorNo) {
            wardNo = response.data.data.sectorNo;
          } else if (response.data.data.wardNo) {
            wardNo = response.data.data.wardNo;
          }

          // Determine which council type was selected
          let nagarpalika = "";
          if (
            response.data.data.villageCouncil &&
            response.data.data.villageCouncil !== "NONE"
          ) {
            nagarpalika = response.data.data.villageCouncil;
          } else if (
            response.data.data.municipalCorporation &&
            response.data.data.municipalCorporation !== "NONE"
          ) {
            nagarpalika = response.data.data.municipalCorporation;
          } else if (
            response.data.data.cityCouncil &&
            response.data.data.cityCouncil !== "NONE"
          ) {
            nagarpalika = response.data.data.cityCouncil;
          }

          setFormData((prev) => ({
            ...prev,
            _id: response.data.data._id,
            name: response.data.data.name || prev.name,
            date: response.data.data.applyDate || prev.date,
            address: response.data.data.address || prev.address,
            mobile: response.data.data.phone || prev.mobile,
            taluka: response.data.data.taluka || prev.taluka,
            bhukhandNo: bhukhandNo || prev.bhukhandNo,
            village: response.data.data.village || prev.village,
            district: response.data.data.city || prev.district,
            wardNo: wardNo || prev.wardNo,
            nagarpalika: nagarpalika || prev.nagarpalika,
            schemeDeveloper:
              response.data.data.schemeDeveloper || prev.schemeDeveloper,
            governmentServiceBranch:
              response.data.data.governmentServiceBranch ||
              prev.governmentServiceBranch,
            serviceNumber: serviceId, // Ensure serviceNumber is set
          }));
        }
      }
      alert("Form submitted successfully!");
      childRef.current.setSuccessMsg("Form submitted successfully!");
      childRef.current.setIsSubmit(true);
      setCanProceed(true);
      // Store the userId in localStorage for use in other components
      if (response.data && response.data.data && response.data.data._id) {
        localStorage.setItem("currentUserId", response.data.data._id);
      }
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);

      if (error.response) {
        childRef.current.setErrorMsg(
          error.response.data.message || "Server error occurred"
        );
      } else if (error.request) {
        childRef.current.setErrorMsg(
          "No response received from server. Please check your connection."
        );
      } else {
        childRef.current.setErrorMsg(
          error.message || "An error occurred while submitting the form"
        );
      }
      childRef.current.setSuccessMsg("");
      setCanProceed(false);
    } finally {
      childRef.current.setIsSubmit(false);
    }
  };
  const onUploadFormSubmit = async (response) => {
    console.log("formData?._id", formData?._id);

    console.log(
      "Form testing : Upload form submit done and response -",
      response
    );
    fetchDepositData(formData?._id, response);
  };
  const nextStage = () => {
    if (currentStage === 0 && !canProceed) {
      // If we're on the first stage and haven't submitted the form successfully
      alert(
        "Please submit the form successfully before proceeding to the next step."
      );
      return;
    }
    setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));
  };

  const prevStage = () => setCurrentStage((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    if (applicationData) {
      console.log("Form testing : Application data changed :", applicationData);
    }
  }, [applicationData]);
  // Function to fetch certified rent deposit copies data
  const fetchDepositData = async (formId, response) => {
    try {
      console.log(
        "Form testing :Starting fetchDepositData with formId:",
        formId
      );
      if (!formId) {
        console.log("No formId available yet, skipping fetch");
        return;
      }
      const token = localStorage.getItem("accessToken");
      console.log("Making API request to fetch data...");
      const response = await axios.get(
        CONFIG.API_BASE_URL + "/api/v1/users/get-specific-form-data",
        {
          params: {
            formId: formId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response received:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.data) {
        const data = response.data.data;
        console.log("form testing : get form details by form id:", data);

        // Format the date
        const formattedDate = data.applyDate
          ? new Date(data.applyDate).toLocaleDateString("en-IN")
          : "";

        // setFormData({
        //   ...data,
        //   applyDate: formattedDate,
        // });
        // const signatureObj = response.data.documentList.find(item => Object.keys(item)[0] === "Signature");
        // const signatureUrl = signatureObj ? signatureObj["Signature"] : null;
        setApplicationData({
          ...data,
          applyDate: formattedDate,
          signature: data.documents.documentList.signature || null,
        });
        // Extract signature URL from the response
        if (data.documents && data.documents.signature) {
          //setSignatureUrl(data.documents.signature);
          console.log("Signature URL set to:", data.documents.signature);
        }
      } else {
        console.log("No data found in response");
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      //setError("Failed to fetch deposit data");
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        <StageTracker currentStage={currentStage} />

        {currentStage === 0 &&
          (serviceId == 1 || serviceId == 2 ? (
            <DashboardForm
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 3 ||
            serviceId == 4 ||
            serviceId == 5 ||
            serviceId == 6 ||
            serviceId == 7 ||
            serviceId == 11 ||
            serviceId == 14 ||
            serviceId == 19 ||
            serviceId == 20 ||
            serviceId == 21 ||
            serviceId == 22 ? (
            <DashboardForm3
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 8 ? (
            <DashboardForm8
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 9 ? (
            <DashBoardForm9
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 10 ? (
            <DashBoardForm10
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 12 ? (
            <DashBoardForm12
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 13 ? (
            <DashBoardForm13
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 15 || serviceId == 16 || serviceId == 17 ? (
            <DashboardForm17
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              set
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : serviceId == 18 ? (
            <DashboardForm18
              ref={childRef}
              formData={formData}
              handleChange={handleChange}
              nextStage={nextStage}
              prevStage={prevStage}
              setCanProceed={setCanProceed}
              onFormSubmit={handleFormSubmit}
            />
          ) : null)}

        {currentStage === 1 &&
          ((serviceId >= 1 && serviceId <= 7) ||
          serviceId == 9 ||
          serviceId == 12 ||
          serviceId == 13 ||
          serviceId == 14 ||
          serviceId == 19 ||
          serviceId == 20 ||
          serviceId == 22 ? (
            <UploadForm
              formData={formData}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 8 ? (
            <UploadForm8
              formData={formData}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 10 ? (
            <UploadForm10
              formData={formData}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 11 ? (
            <UploadForm11
              formData={formData}
              serviceId={serviceId}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 15 || serviceId == 16 || serviceId == 17 ? (
            <UploadForm15
              formData={formData}
              serviceId={serviceId}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 18 ? (
            <UploadForm18
              formData={formData}
              serviceId={serviceId}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : serviceId == 21 ? (
            <UploadForm21
              formData={formData}
              serviceId={serviceId}
              formId={formData._id}
              onFormSubmit={onUploadFormSubmit}
            />
          ) : null)}
        {currentStage === 2 &&
          (serviceId === 1 ? (
            <Form1 formData={applicationData} formId={formData._id} />
          ) : serviceId === 2 ? (
            <Form2 formData={applicationData} formId={formData._id} />
          ) : serviceId === 3 ? (
            <Form3 formData={applicationData} formId={formData._id} />
          ) : serviceId === 4 ? (
            <Form4 formData={applicationData} formId={formData._id} />
          ) : serviceId === 5 ? (
            <Form5 formData={applicationData} formId={formData._id} />
          ) : serviceId === 6 ? (
            <Form6 formData={applicationData} formId={formData._id} />
          ) : serviceId === 7 ? (
            <Form7 formData={applicationData} formId={formData._id} />
          ) : serviceId === 8 ? (
            <Form8 formData={applicationData} formId={formData._id} />
          ) : serviceId === 9 ? (
            <Form9 formData={applicationData} formId={formData._id} />
          ) : serviceId === 10 ? (
            <Form10 formData={applicationData} formId={formData._id} />
          ) : serviceId === 11 ? (
            <Form11 formData={applicationData} formId={formData._id} />
          ) : serviceId === 12 ? (
            <Form12 formData={applicationData} formId={formData._id} />
          ) : serviceId === 13 ? (
            <Form13 formData={applicationData} formId={formData._id} />
          ) : serviceId === 14 ? (
            <Form14 formData={applicationData} formId={formData._id} />
          ) : serviceId === 15 ? (
            <Form15 formData={applicationData} formId={formData._id} />
          ) : serviceId === 16 ? (
            <Form16 formData={applicationData} formId={formData._id} />
          ) : serviceId === 17 ? (
            <Form17 formData={applicationData} formId={formData._id} />
          ) : serviceId === 18 ? (
            <Form18 formData={applicationData} formId={formData._id} />
          ) : serviceId === 19 ? (
            <Form19 formData={applicationData} formId={formData._id} />
          ) : serviceId === 20 ? (
            <Form20 formData={applicationData} formId={formData._id} />
          ) : serviceId === 21 ? (
            <Form21 formData={applicationData} formId={formData._id} />
          ) : serviceId === 22 ? (
            <Form22 formData={applicationData} formId={formData._id} />
          ) : null)}

        {/* Buttons */}
        <div className="flex flex-wrap justify-between mt-8 gap-4">
          <CustomButton variant="black" onClick={prevStage}>
            BACK
          </CustomButton>
          <CustomButton variant="outline" onClick={prevStage}>
            PREVIEW
          </CustomButton>
          {currentStage < stages.length - 1 && (
            <CustomButton
              variant="primary"
              onClick={nextStage}
              disabled={currentStage === 0 && !canProceed}
              className={
                currentStage === 0 && !canProceed
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              NEXT
            </CustomButton>
          )}
          {currentStage === stages.length - 1 && (
            <CustomButton onClick={() => navigate("/thank")} variant="danger">
              SUBMIT
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
