import { useState, useEffect } from "react";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import DownloadPDF from "../UserForm/DownloadPDF";
import { useLocation } from "react-router-dom";

const Form18 = ({ formData: initialFormData, formId }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = parseInt(queryParams.get("serviceId"));

  console.log("Form18 Component Rendered with:", { initialFormData, formId });

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
                <div className="text-left flex  ml-[50%]">सेवा क्र.१८</div>
              </div>
              <p className="text-sm mb-4">
                (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत अधिसूचित सेवा
                मिळणबाबतच्या अर्जाचा नमूना )
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
                    {/* {formData.applyDate || "_____________"} */}
                    {formData.applyDate
                      ? new Date(formData.applyDate).toLocaleDateString("en-IN")
                      : "_____________"}{" "}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <p className="">प्रति,</p>
                <div className="space-y-1">
                  <p>
                    सक्षम प्राधिकारी क्र{" "}
                    {formData.competentAuthorityNo || "_____________"}
                  </p>
                  <p>मुंबई महानगर प्रदेश ,</p>
                  <p>झोपडपट्टी पुनर्वसन प्राधिकरण </p>
                  <p>ठाणे .</p>
                </div>
              </div>

              <div className="mt-8">
                <div
                  className="font-medium text-wrap "
                  style={{ marginLeft: "40px" }}
                >
                  <div className="flex">
                    <p>विषय:- </p>
                    <div className="ml-3">
                      <p>
                        मौजे {formData.village || "_______"} तालुका{" "}
                        {formData.village || "_______"} ठाणे येथील न. भू.
                        प्र./अ. भू. क्र/स न{getPlotDisplay()} या मिळकतीवरील{" "}
                        {formData.governmentServiceBranch || "_____________"} सह
                        : गृह संस्थेच्या झोपडपट्टी पुनर्वसन योजनेमधील परिशिष्ट-
                        २ मधील अ. क्र.
                        {formData.rehabilitationScheme || "_______"}
                        वरील माझे पती/ पत्नी/ आई / वडील याचा मृत्यूनंतर माझे नाव
                        नौदविण्याबाबत.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex">
                      <p>विषय:- </p>
                      <div className="ml-3">
                        <p>
                          {" "}
                          १){formData.governmentServiceBranch || "_______"}{" "}
                          सहकारी गृहनिर्माण संस्थेमार्फत राबविण्यात येणारी
                          झोपडपट्टी पुनर्वसन योजना.
                        </p>
                        <p>
                          {" "}
                          २) समाज विकास विभाग, ठाणे महानगरपालिका/ उपजिल्हाधिकारी
                          झोपडपट्टी पुनर्वसन प्राधिकरण ठाणे याच्या कार्यालयाकडून
                          प्रमाणित करण्यात आलेले परिशिष्ट -२{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-5">महोदय,</p>

                <div className="space-x-4 px-4">
                  <p>
                    उपरोक्त विषयास अनुसरुन मला मौजे -
                    {formData.village || "_______"} तालुका{" "}
                    {formData.taluka || "_______"} जिल्हा{" "}
                    {formData.city || "_______"} येथील. {getMunicipalDisplay()}{" "}
                    महानगरपालिका हद्दीतील सेक्टर क्र./वार्ड क्र{" "}
                    {getWardDisplay()} मधील न.भू.क्र {getPlotDisplay()} या
                    मिलकतीवर झोपडपट्टी पुनर्वसन योजना राबवित आहे{" "}
                  </p>
                  <p>
                    सदर गृहनिर्माण संस्थेच्या परिशिष्ट -२ मध्ये अ. क्र.
                    {formData.rehabilitationScheme || "_______"}
                    वर माझे पती/ पत्नी /आई /वडील श्री{" "}
                    {formData.name || "_______"}
                    यांना निवासी /अनिवासी /प्रयोगनार्थ पात्र करण्यात आलेले आहे.
                    माझे पती/ पत्नी /आई /वडील आईने दि.
                    {/* {formData.deathCertificateHusbandWifeSonDaughter ||
                      "_______"} */}
                    {formData.deathCertificateHusbandWifeSonDaughter
                      ? new Date(
                          formData.deathCertificateHusbandWifeSonDaughter
                        ).toLocaleDateString("en-IN")
                      : "_____________"}{" "}
                    रोजी निधन झाले आहे. त्यावर वारसदार म्हणून पती/ पत्नी / मुलगा
                    /मुलगी ह्या नात्याने माझे नाव परिशिष्ट - २ मधील अ. क्र
                    {formData.rehabilitationScheme || "_______"}
                    वर वारस म्हणून नोंदविण्यात यावे.
                  </p>
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

export default Form18;
