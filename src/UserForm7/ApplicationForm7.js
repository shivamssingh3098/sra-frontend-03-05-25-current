import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigate, navigate } from "react-router-dom";
import DashBoardForm7 from "./DashBoardForm7";
import UploadForm7 from "./UploadForm7";
import Form7 from "./Form7";


const stages = ["मूलभूत माहिती", "कागदपत्रे", "प्रमाणपत्र"];


const StageTracker = ({ currentStage }) => {
  return (
    <div className="flex justify-around items-center mb-6">
      {stages.map((stage, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === currentStage
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
          <div className="text-left">सेवा क्र.७</div>
          <CustomButton
            variant="primary"
            className="flex items-center gap-1"
          >
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

const ApplicationForm7 = () => {
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
  });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const nextStage = () => setCurrentStage((prev) => Math.min(prev + 1, stages.length - 1));

  const prevStage = () => setCurrentStage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        <StageTracker currentStage={currentStage} />

        {currentStage === 0 && (
          <DashBoardForm7
            formData={formData}
            handleChange={handleChange}
            nextStage={nextStage}
            prevStage={prevStage}
          />
        )}
        {currentStage === 1 && <UploadForm7 />}
        {currentStage === 2 && <Form7 formData={formData} />}

        {/* Buttons */}
        <div className="flex flex-wrap justify-between mt-8 gap-4">
          <CustomButton
            variant="black"
            onClick={prevStage}
          >
            BACK
          </CustomButton>
          <CustomButton
            variant="outline"
            onClick={prevStage}
          >
            PREVIEW
          </CustomButton>
          {currentStage < stages.length - 1 && (
            <CustomButton
              variant="primary"
              onClick={nextStage}
            >
              NEXT
            </CustomButton>
          )}
          {currentStage === stages.length - 1 && (
            <CustomButton
              onClick={() => navigate('/payment')}
              variant="danger"
            >
              SUBMIT
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm7;
