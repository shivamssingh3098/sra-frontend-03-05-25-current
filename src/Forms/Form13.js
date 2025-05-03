import { useState } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios"; // Ensure axios is imported

const Form13 = () => {
  const CertificateStage = ({ formData }) => (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Certificate Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-left">सेवा क्र.१३</div>
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
            (महाराष्ट्र लोकसेवा हक्क अनियमित २०१५ अंतर्गत सेवा मिळणेकरीत सादर
            करावयाचा आरजाचा नमूना)
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
              <span>दि. :</span>
              <span className="mx-2">:</span>
              <span className="flex-1 border-b border-gray-300">
                {formData.date || "_____________"}
              </span>
            </div>
          </div>

          {/* intigrit at here */}

          <div className="mt-8">
            <p className="mb-2">प्रति,</p>
            <div className=" ">
              <p>जिल्हा अधीक्षक भूमी अभिलेख </p>
              <p>मुंबई महानगर प्रदेश</p>
              <p>झोपडपट्टी पुनर्वसन प्राधिकरण ठाणे.</p>
            </div>
          </div>

          <div className="mt-8">
            <p
              className="font-medium text-wrap d-flex"
              style={{ marginLeft: "40px" }}
            >
              <b>
                विषय :- PAP सदनिका वाटपाबाबत आदेशाची प्रमाणित प्रत उपलब्ध करून
                देणेबाबत.{" "}
              </b>
            </p>

            <p className="mt-5">महोदय,</p>

            <div className="space-y-4">
              <p>
                श्री, {formData.name || "_______"} यांना{" "}
                {formData.sahakari || "_______"} सहकारी गृहनिर्माण संस्थेच्या
                इमारतीमध्ये सदनिका क्र. {formData.sadnika || "_______"} वाटप
                करण्यात आली आहे. तरी सदर सदनिका वाटप पत्राच्या आदेशाची प्रमाणित
                प्रत उपलब्ध करून देण्यात यावी.
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
    jhopdi: "",
    sahakari: "",
    sadnika: "",
    patipatni: "",
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

export default Form13;
