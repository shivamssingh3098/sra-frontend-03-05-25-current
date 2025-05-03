import { useState, useEffect } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import DownloadPDF from "../UserForm/DownloadPDF";
import { useLocation } from "react-router-dom";

const Form10 = ({ formData: initialFormData, formId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  console.log("Form10 Component Rendered with:", { initialFormData, formId });

  const [formData, setFormData] = useState(
    initialFormData || {
      name: "",
      address: "",
      phone: "",
      village: "",
      taluka: "",
      district: "",
      wardNo: "",
      municipalCorporation: "",
      schemeDeveloper: "",
      governmentServiceBranch: "",
      sectorNo: "",
      finalPlot: "",
      applyDate: "",
      surveyNo: "",
      cityCouncil: "",
      villageCouncil: "",
      landNumber: "",
    }
  );

  const [depositData, setDepositData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);

  // Function to fetch certified rent deposit copies data
  // const fetchDepositData = async () => {
  //   try {
  //     console.log("Starting fetchDepositData with formId:", formId);
  //     if (!formId) {
  //       console.log("No formId available yet, skipping fetch");
  //       return;
  //     }

  //     console.log("Making API request to fetch data...");
  //     const response = await axios.get(CONFIG.API_BASE_URL +
  //       "/api/v1/users/create-common-form",
  //       {
  //         params: {
  //           formId: formId,
  //         },
  //       }
  //     );

  //     console.log("API Response received:", {
  //       status: response.status,
  //       data: response.data,
  //       headers: response.headers,
  //     });

  //     if (
  //       response.data &&
  //       response.data.data &&
  //       response.data.data.length > 0
  //     ) {
  //       const data = response.data.data[0];
  //       console.log("Setting form data with:", data);

  //       // Format the date
  //       const formattedDate = data.applyDate
  //         ? new Date(data.applyDate).toLocaleDateString("en-IN")
  //         : "";

  //       setFormData({
  //         ...data,
  //         applyDate: formattedDate,
  //       });

  //       // Extract signature URL from the response
  //       if (data.documents && data.documents.signature) {
  //         setSignatureUrl(data.documents.signature);
  //         console.log("Signature URL set to:", data.documents.signature);
  //       }
  //     } else {
  //       console.log("No data found in response");
  //     }
  //   } catch (error) {
  //     console.error("Error details:", {
  //       message: error.message,
  //       response: error.response?.data,
  //       status: error.response?.status,
  //     });
  //     setError("Failed to fetch deposit data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log("useEffect triggered with formId:", formId);
  //   if (formId) {
  //     fetchDepositData();
  //   }
  // }, [formId]);

  const CertificateStage = ({ formData }) => {
    // Determine which plot number to display
    const getPlotDisplay = () => {
      if (formData.finalPlot) {
        return formData.finalPlot;
      } else if (formData.landNumber) {
        return formData.landNumber;
      } else if (formData.surveyNo) {
        return formData.surveyNo;
      }
      return "_____________";
    };

    const getWardDisplay = () => {
      if (formData.wardNo) {
        return formData.wardNo;
      } else if (formData.sectorNo) {
        return formData.sectorNo;
      }
      return "_____________";
    };

    const getMunicipalDisplay = () => {
      if (
        formData.municipalCorporation &&
        formData.municipalCorporation !== "NONE"
      ) {
        return formData.municipalCorporation;
      } else if (
        formData.villageCouncil &&
        formData.villageCouncil !== "NONE"
      ) {
        return formData.villageCouncil;
      } else if (formData.cityCouncil && formData.cityCouncil !== "NONE") {
        return formData.cityCouncil;
      }
      return "_____________";
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <div className="flex justify-end p-2">
            <DownloadPDF fileName={formData ? formData?.name : "sample"} />
          </div>
          <div id="formFinal" className="p-4">
            {/* Certificate Header */}
            <div className="text-center mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-left flex  ml-[50%]">
                  सेवा क्र.{serviceId}
                </div>
              </div>
              <p className="text-sm mb-4">
                (महाराष्ट्र लोकसेवा हक्क अनियमित २०१५ अंतर्गत सेवा मिळणेकरीत
                सादर करावयाचा आरजाचा नमूना)
              </p>
              {/* Photo Box */}
              <div className="flex justify-end mb-4">
                <div className="border border-gray-400 w-24 h-12 flex items-center justify-center text-gray-400 text-xs">
                  ₹ २६ चे कोर्ट फी
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
                    {formData.phone || "_____________"}
                  </span>
                </div>
                <div className="flex">
                  <span>दि. </span>
                  <span className="mx-2">:</span>
                  <span className="flex-1 border-b border-gray-300">
                    {formData.applyDate || "_____________"}
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
                <div
                  className="font-medium text-wrap d-flex "
                  style={{ marginLeft: "40px" }}
                >
                  <div>विषय:- </div>
                  <div>
                    <div>
                      {" "}
                      महाराष्ट्र झोपडपट्टी क्षेत्र (सुधारणा, निर्मूलन व पुनर्वसन
                      ) अधिनियम १९७१ मधील कलम ३ (इ ) नुसार व झोपडपट्टी पुनर्वसन
                      प्राधिकारणाचे परिपत्रक क्र ३१ दि. २८/०५/२०२१ अन्वये माझ्या
                      सदानिकेचे / गाळायाच हस्तांतरणास परवानगी मिळणेबाबत.
                    </div>
                    <div
                      className="d-flex justify-content-between "
                      style={{ width: "80%" }}
                    >
                      <div>
                        <p>
                          सदनिका / गाळा क्र.{" "}
                          {formData.applyDate || "_____________"}
                        </p>
                      </div>
                      <div>
                        <p>
                          सहकारी गृहनिर्माण संस्था पत्ता{" "}
                          {formData.applyDate || "_____________"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-5">महोदय,</p>

                <div className="space-y-4 m-3">
                  <div>
                    <p>
                      मी श्री/ श्रीमती {formData.name || "_______"} वरील
                      पत्यामध्ये नमूद सहकारी गृहनिर्माण संस्थेच्या सभासद आहे.{" "}
                      दिनांक .{formData.date || "_______"} रोजी तंबापत्रानुसार
                      सदनिका / गाळा क्र.{" "}
                      {formData.apartmentNoShopProvidingDate || "_______"} मला
                      वाटप करण्यात आला आहे.{" "}
                    </p>
                    <p>
                      सदर गाळा/ सदनिका मला वाटप होवून १० वर्षाचा कालावधी पूर्ण
                      झालेला आहे. माझ्या वैयक्तिक कारणामुळे मला या
                      सदनिका/गाळयाचे विकरिद्वारे श्री/ श्रीमती{" "}
                      {formData.name || "_______"} पत्ता{" "}
                      {formData.address || "_______"} यांना हस्तातरीत करावयाचे
                      आहे.{" "}
                    </p>
                    <p>
                      वर उल्लेखित परिपत्रक क्रमांक ३१ मधील तरतुदीनुसार मला सदर
                      सदनिका/गाळा हस्तांतरणाची परवानगी देण्यात यावी अंशी विनंती
                      आहे.
                    </p>
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="mt-12 flex justify-end">
                <div className="text-center">
                  {formData?.signature ? (
                    <div className="mb-2">
                      <img
                        src={formData?.signature}
                        alt="अर्जदाराची स्वाक्षरी"
                        className="max-h-20 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-20 border-b border-gray-400"></div>
                  )}
                  <p className="mt-2">(अर्जदाराची स्वाक्षरी)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Form10;
