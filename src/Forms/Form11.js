import { useState } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios"; // Ensure axios is imported

const Form11 = () => {
  const CertificateStage = ({ formData }) => (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Certificate Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-left">सेवा क्र.११</div>
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
            <p className="">प्रति,</p>
            <div className=" space-y-1">
              <p>जिल्हा अधीक्षक भूमी अभिलेख </p>
              <p>मुंबई महानगर प्रदेश</p>
              <p>झोपडपट्टी पुनर्वसन प्राधिकरण ठाणे</p>
            </div>
          </div>

          <div className="mt-8">
            <p
              className="font-medium text-wrap d-flex"
              style={{ marginLeft: "40px" }}
            >
              <b>
                विषय :- पुनर्वसन योजनेतील पात्र संभासदाना झोपडी तोंडल्यानंतर
                पर्यायी जागेपोटी भाडे मिळाले नसल्यास करावयाचा अर्ज
              </b>
            </p>

            <p className="mt-5">महोदय,</p>

            <div className="space-y-4">
              <p>
                उपरोक्त विषयास अनुसरुन मला मौजे -{formData.mouje || "_______"}{" "}
                तालुका {formData.taluka || "_______"} जिल्हा{" "}
                {formData.district || "_______"} ये थील.{" "}
                {formData.nagarpalika || "_______"} महानगरपालिका हद्दीतील सेक्टर
                क्र./वार्ड क्र {formData.wardNo || "_______"} मधील न.भू.क्र{" "}
                {formData.bhukhandNo || "_______"} ये थील{" "}
                {formData.sahakari || "_______"} सहकारी गृहनिर्माण संस्थेसाठी
                परिपत्रक क्र. ३ अन्वये विकसकाने सादर केलेल्या GIS सीडीची प्रत
                उपलब्ध करून देणेत याव्यात ही विनंती.
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

          {/* Guidelines */}
          <div className="mt-8 space-y-2 text-sm">
            <p className="font-medium">कायगती पद्धत:*</p>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed text-sm">
              <li>
                पात्र व्यक्तीने रु. 10/- किंमतीचे कोर्ट फी स्टॅम्प लावून, दिलेला
                नमुना अर्ज भरून संबंधित विभागाकडे सादर करावा.
              </li>
              <li>
                पदनिर्देशित अधिकारी संबंधित पात्र व्यक्तीस आवश्यक प्रमाणपत्रांची
                एकूण संख्या व प्रति प्रमाणपत्र रु. 26/- प्रमाणे भरण्याची रक्कम
                कळवतील.
              </li>
              <li>
                संबंधित व्यक्तींनी रक्कम भरल्यानंतर, वरील माहितीची सत्य प्रत
                संबंधितांना उपलब्ध करून देण्यात येईल.
              </li>
              <li>
                ज्या अर्जदाराचा अर्ज फेटाळण्यात आला असेल किंवा निर्धारित
                कालमर्यादेत लोकसेवा दिली नसेल, अशा अर्जदाराने अर्ज फेटाळल्याच्या
                आदेशाच्या किंवा कालमर्यादा संपल्याच्या तारखेपासून 30 दिवसांच्या
                आत प्रथम अपीलीय अधिकाऱ्यांकडे अपील दाखल करावे. त्यानंतर अपील
                दाखल केल्याच्या तारखेपासून 30 दिवसांच्या आत अधिकृत निर्णय दिला
                जाईल.
              </li>
              <li>
                प्रथम अपीलीय अधिकाऱ्याचा आदेश प्राप्त झाल्यानंतर 30 दिवसांच्या
                आत किंवा प्रथम अपील दाखल केल्याच्या तारखेपासून 45 दिवसांनंतर
                दुसऱ्या अपीलीय अधिकाऱ्यांकडे दुसरे अपील दाखल करता येईल. त्यानंतर
                दुसरे अपीलीय अधिकारी सदर अर्ज प्राप्त झाल्यापासून 45 दिवसांच्या
                आत निर्णय देत
              </li>
            </ol>
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

export default Form11;
