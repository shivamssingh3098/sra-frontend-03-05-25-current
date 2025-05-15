import { useState } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios"; // Ensure axios is imported

const Form10 = () => {
  const CertificateStage = ({ formData }) => (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Certificate Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-left"> सेवा क्र.१० </div>
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
            (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत अधिसूचित सेवा
            मिळणबाबतच्या अर्जाचा नमूना )
          </p>
          {/* Photo Box */}
          <div className="flex justify-end mb-4">
            <div className="border border-gray-400 w-24 h-12 flex items-center justify-center text-gray-400 text-xs">
              ₹ १० चे कोर्ट फी
            </div>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="space-y-6 text-sm">
          <div className="d-flex justify-content-center align-items-end flex-column">
            <div className="flex">
              <span>अर्जदाराचे नाव</span>
              <span className="mx-2">:</span>
              <span className="flex-1 border-b border-gray-300">
                {formData.name || "_____________"}
              </span>
            </div>
            <div className="flex">
              <span>पत्ता</span>
              <span className="mx-2">:</span>
              <span className="flex-1 border-b border-gray-300">
                {formData.address || "_____________"}
              </span>
            </div>
            <div className="flex">
              <span>मोबाईल क्र.</span>
              <span className="mx-2">:</span>
              <span className="flex-1 border-b border-gray-300">
                {formData.mobile || "_____________"}
              </span>
            </div>
            <div className="flex">
              <span>दि. </span>
              <span className="mx-2">:</span>
              <span className="flex-1 border-b border-gray-300">
                {formData.date || "_____________"}
              </span>
            </div>
          </div>

          {/* intigrit at here */}

          <div className="mt-8">
            <p className="">प्रति,</p>
            <div className=" space-y-1">
              <p> मा. सहाय्यक निबंधक सहकारी संस्था, </p>
              <p> मुंबई महानगर प्रदेश झोपडपट्टी </p>
              <p> पुनर्वसन प्राधिकरण, </p>
              <p> ठाणे महानगरपालिका मंडई इमारत, </p>
              <p> डॉ. काशिनाथ घाणेकर नाट्यगृह जवळ, </p>
              <p> केवरा सर्कल, ग्लडी अलवारिस रास्ता, </p>
              <p> मानपाडा, ठाणे (पश्चिम) ४०० ६१० </p>
            </div>
          </div>

          <div className="mt-8">
            <div
              className="font-medium text-wrap d-flex"
              style={{ marginLeft: "40px" }}
            >
              <b>
                विषय :- महाराष्ट्र झोपडपट्टी क्षेत्र (सुधारणा, निर्मूलन व
                पुनर्वसन ) अधिनियम १९७१ मधील कलम ३ (इ ) नुसार व झोपडपट्टी
                पुनर्वसन प्राधिकारणाचे परिपत्रक क्र ३१ दि. २८/०५/२०२१ अन्वये
                माझ्या सदानिकेचे / गाळायाच हस्तांतरणास परवानगी मिळणेबाबत.
                <div className="w-75 d-flex justify-content-between align-itmes-center">
                  <p> सदनिका / गाळा क्र.</p>
                  <p>सहकारी गृहनिर्माण संस्था पत्ता</p>
                </div>
              </b>
            </div>

            <p className="mt-5">महोदय,</p>

            <div className="space-y-4 mb-12">
              <div>
                <p>
                  उपरोक्त विषयास अनुसरुन मौजे -{formData.mouje || "_______"}{" "}
                </p>
                <div className="d-flex justify-content-between align-itmes-center w-100">
                  <p>
                    दिनांक .{formData.date || "_______"} /
                    {formData.date.month || "_______"} / २०
                    {formData.date.year || "_______"}{" "}
                  </p>
                  <p>
                    रोजी तंबापत्रानुसार सदनिका / गाळा क्र.
                    {formData.mouje || "_______"}{" "}
                  </p>
                  <p>मला वाटप करण्यात आला आहे.</p>
                </div>
                <p>
                  सदर गाळा/ सदनिका मला वाटप होवून १० वर्षाचा कालावधी पूर्ण
                  झालेला आहे. माझ्या वैयक्तिक कारणामुळे मला या सदनिका/गाळयाचे
                  विकरिद्वारे श्री/ श्रीमती {formData.name || "_______"} पत्ता{" "}
                  {formData.address || "_______"} यांना हस्तातरीत करावयाचे आहे.
                </p>
                <p>
                  वर उल्लेखित परिपत्रक क्रमांक ३१ मधील तरतुदीनुसार मला सदर
                  सदनिका/गाळा हस्तांतरणाची परवानगी देण्यात यावी अंशी विनंती आहे.
                </p>
              </div>
            </div>
          </div>

          {/* Name Section */}
          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="mt-2">
                (श्री / श्रीमती :- {formData.name || "_______"} )
              </p>
            </div>
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
    yojana: "",
    sahakari: "",
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="d-flex justify-content-center align-items-start gap-3"
        style={{ width: "100%" }}
      >
        <div className="leftside w-75 h-100">
          <CertificateStage formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default Form10;
