import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardForm20 from "./DashBoardForm20";
import UploadForm20 from "./UploadForm20";
import Form20 from "./Form20";
import CustomButton from "../components/CustomButton";

const stages = ["Basic Information", "Upload Documents", "Preview"];

const StageTracker = ({ currentStage }) => (
  <div className="flex justify-between items-center mb-6">
    {stages.map((stage, index) => (
      <div
        key={index}
        className={`flex items-center ${
          index < stages.length - 1 ? "flex-1" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index <= currentStage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {index + 1}
        </div>
        <div
          className={`ml-2 text-sm ${
            index <= currentStage ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {stage}
        </div>
        {index < stages.length - 1 && (
          <div
            className={`flex-1 h-1 mx-2 ${
              index < currentStage ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

const ApplicationForm20 = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    sarkari: "",
    punervasan: "",
    zopadi: "",
    punervasanDate: "",
    sadnika: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const nextStage = () =>
    setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));

  const prevStage = () => setCurrentStage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        <StageTracker currentStage={currentStage} />

        {currentStage === 0 && (
          <DashBoardForm20
            formData={formData}
            handleChange={handleChange}
            nextStage={nextStage}
            prevStage={prevStage}
          />
        )}
        {currentStage === 1 && <UploadForm20 />}
        {currentStage === 2 && <Form20 formData={formData} />}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <CustomButton variant="black" onClick={prevStage}>
            BACK
          </CustomButton>
          <CustomButton variant="outline" onClick={prevStage}>
            PREVIEW
          </CustomButton>
          {currentStage < stages.length - 1 && (
            <CustomButton variant="primary" onClick={nextStage}>
              NEXT
            </CustomButton>
          )}
          {currentStage === stages.length - 1 && (
            <CustomButton onClick={() => navigate("/payment")} variant="danger">
              SUBMIT
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm20;
