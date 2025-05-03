import { useState, useEffect } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import CONFIG from "../app.config.js";
import htmlToPdfConverter from "../utils/htmlToPdfConverter";

const UserForm = ({ formData: initialFormData, formId }) => {
  console.log("Form1 Component Rendered with:", { initialFormData, formId });

  const [formData, setFormData] = useState(
    initialFormData || {
      name: "",
      date: "",
      address: "",
      mobile: "",
      taluka: "",
      bhukhandNo: "",
      village: "",
      district: "",
      wardNo: "",
      nagarpalika: "",
      schemeDeveloper: "",
      governmentServiceBranch: "",
    }
  );

  const [depositData, setDepositData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch certified rent deposit copies data
  const fetchDepositData = async () => {
    try {
      console.log("Starting fetchDepositData with formId:", formId);
      if (!formId) {
        console.log("No formId available yet, skipping fetch");
        return;
      }

      console.log("Making API request to fetch data...");
      const response = await axios.get(
        CONFIG.API_BASE_URL + "https://sra-government-project-thane-1.onrender",
        {
          params: {
            formId: formId,
          },
        }
      );

      console.log("API Response received:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.data && response.data.length > 0) {
        console.log("Setting form data with:", response.data[0]);
        setFormData(response.data[0]);
      } else {
        console.log("No data found in response");
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError("Failed to fetch deposit data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with formId:", formId);
    if (formId) {
      fetchDepositData();
    }
  }, [formId]);

  const CertificateStage = ({ formData }) => {
    // Determine which bhukhand type to display
    const getBhukhandDisplay = () => {
      if (formData.bhukhandNo) {
        return formData.bhukhandNo;
      }
      return "_____________";
    };

    // Determine which ward type to display
    const getWardDisplay = () => {
      if (formData.wardNo) {
        return formData.wardNo;
      }
      return "_____________";
    };

    // Determine which council type to display
    const getNagarpalikaDisplay = () => {
      if (formData.nagarpalika && formData.nagarpalika !== "NONE") {
        return formData.nagarpalika;
      }
      return "_____________";
    };

    const downloadToPdf = () => {
      console.log(`form data ${JSON.stringify(formData)}`);
      htmlToPdfConverter("formFinal", formData ? formData?.name : "sample");
    };

    return (
      <>
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg ">
            <div className="flex justify-end p-2">
              <CustomButton
                variant="primary"
                className="flex items-center gap-1"
                onClick={downloadToPdf}
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
            <div id="formFinal" className="p-4">
              {/* Certificate Header */}
              <div className="text-center mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-left">सेवा क्र.१</div>
                </div>
                <p className="text-sm mb-4">
                  (महाराष्ट्र लोकसेवा हक्क अनियमित २०१५ अंतर्गत सेवा मिळणेकरीत
                  सादर करावयाचा आरजाचा नमूना)
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
                      {formData?.mobile ||
                        formData?.landNumber ||
                        "_____________"}
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

                <div className="mt-8">
                  <p className="">प्रति,</p>
                  <div className="space-y-1">
                    <p>उपलेखापाल</p>
                    <p>वित्त विभाग</p>
                    <p>मुंबई महानगर प्रदेश</p>
                    <p>झोपडपट्टी पुनर्वसन प्राधिकरण ठाणे.</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p
                    className="font-medium text-wrap d-flex"
                    style={{ marginLeft: "40px" }}
                  >
                    विषय :- भाडे-परिपत्रक क्र.41 अन्वये सहकार विभागाच्या
                    अहवालानुसार झोपडपट्टीधारकांच्या बँक खात्यावर भाडे प्रदान
                    तपशीलाच्या सत्यप्रती उपलब्ध करुन देणेबाबत.
                  </p>

                  <p className="mt-5">महोदय,</p>

                  <div className="space-y-4">
                    <p>
                      उपरोक्त विषयास अनुसरुन मला मौजे -
                      {formData.village || "_______"} तालुका{" "}
                      {formData.taluka || "_______"} जिल्हा{" "}
                      {formData.district || "_______"} ये थील.{" "}
                      {getNagarpalikaDisplay()} महानगरपालिका हद्दीतील सेक्टर
                      क्र./वार्ड क्र {getWardDisplay()} मधील न.भू.क्र{" "}
                      {getBhukhandDisplay()} ये थील{" "}
                      {formData.governmentServiceBranch || "_______"} सहकारी
                      गृहनिर्माण संस्थेच्या झोपडपट्टी पुनर्वसन योजना विकासक{" "}
                      {formData.schemeDeveloper || "_______"} यांचेमार्फत विकसित
                      करण्यात येत आहे.
                    </p>
                    <p>
                      भाडे परिपत्रक क्र.41 अन्वये झोपडपट्टीधारक यांना
                      विकासकामार्फत भाडे अदा करण्याच्या कार्यपध्दती व
                      तरतुदीनुसार झोपडपट्टीधारकांच्या बँक खात्यावर भाडे प्रदान
                      तपशिलाच्या सत्यप्रति उपलब्ध करुन द्याव्यात ही विनंती.
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
        </div>
      </>
    );
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CertificateStage formData={formData} />
    </div>
  );
};

export default UserForm;
