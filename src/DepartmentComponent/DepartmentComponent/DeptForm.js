import { useState } from "react";
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CustomButton from "../../components/CustomButton";
import axios from "axios"; // Ensure axios is imported

const DeptForm = () => {
    const CertificateStage = ({ formData }) => (
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                {/* Certificate Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-left">सेवा क्र.१</div>
                        <CustomButton variant="primary" className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </CustomButton>
                    </div>
                    <p className="text-sm mb-4">
                        (महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत सेवा मिळविण्याचा नमुना)
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
                            <span className="flex-1 border-b border-gray-300">{formData.name || "_____________"}</span>
                        </div>
                        <div className="flex">
                            <span>पत्ता</span>
                            <span className="mx-2">:</span>
                            <span className="flex-1 border-b border-gray-300">{formData.address || "_____________"}</span>
                        </div>
                        <div className="flex">
                            <span>मोबाईल क्र.</span>
                            <span className="mx-2">:</span>
                            <span className="flex-1 border-b border-gray-300">{formData.mobile || "_____________"}</span>
                        </div>
                        <div className="flex">
                            <span>दि. :</span>
                            <span className="mx-2">:</span>
                            <span className="flex-1 border-b border-gray-300">{formData.mobile || "_____________"}</span>
                        </div>
                    </div>

                    {/* Other certificate details... */}

                    {/* intigrit at here */}

                    <div className="mt-8">
                        <p className="">प्रति,</p>
                        <div className=" space-y-1">
                            <p>उपलेखापाल</p>
                            <p>वित्त विभाग</p>
                            <p>मुंबई महानगर प्रदेश</p>
                            <p>झोपडपट्टी पुनर्वसन प्राधिकरण.</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="font-medium text-wrap" style={{ marginLeft: '40px' }}>
                            विषय :- भाडे-परिपत्रक क्र.41 अन्वये सहकार विभागाच्या अहवालानुसार झोपडपट्टीधारकांच्या बँक खात्यावर
                            भाडे प्रदान तपशीलाच्या सत्यप्रती उपलब्ध करुन देणेबाबत.
                        </p>

                        <p className="mt-5">महोदय,</p>

                        <div className="space-y-4">
                            <p>
                                उपरोक्त विषयास अनुसरुन मौजे -{formData.mouje || "_______"}{" "}
                                {formData.taluka || "_______"} तालुका{" "}
                                {formData.district || "_______"} जिल्हा ये थील{" "}
                                {formData.mahanagar || "_______"} महानगरपालिका हद्दीतील सेक्टर क्र./वार्ड क्र{" "}
                                {formData.bhukhandNo || "_______"} मधील न.भू.क्र {" "}
                                {formData.wardNo || "_______"} ये थील {" "}
                                {formData.sahagruh || "_______"} सहकारी गृहनिर्माण संस्थेच्या झोपडपट्टी पुनर्वसन योजना विकासक {" "}
                                {formData.wiksit || "_______"} यांचेमार्फत विकसित करण्यात येत आहे. {" "}
                            </p>
                            <p>
                                भाडे परिपत्रक क्र.41 अन्वये झोपडपट्टीधारक यांना विकासकामार्फत भाडे अदा करण्याच्या कार्यपध्दती व
                                तरतुदीनुसार झोपडपट्टीधारकांच्या बँक खात्यावर भाडे प्रदान तपशिलाच्या सत्यप्रति उपलब्ध करुन द्याव्यात ही
                                विनंती.
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
                            <li>पात्र व्यक्तीने रु. 10/- किंमतीचे कोर्ट फी स्टॅम्प लावून, दिलेला नमुना अर्ज भरून संबंधित विभागाकडे सादर करावा.</li>
                            <li>पदनिर्देशित अधिकारी संबंधित पात्र व्यक्तीस आवश्यक प्रमाणपत्रांची एकूण संख्या व प्रति प्रमाणपत्र रु. 26/- प्रमाणे भरण्याची रक्कम कळवतील.</li>
                            <li>संबंधित व्यक्तींनी रक्कम भरल्यानंतर, वरील माहितीची सत्य प्रत संबंधितांना उपलब्ध करून देण्यात येईल.</li>
                            <li>ज्या अर्जदाराचा अर्ज फेटाळण्यात आला असेल किंवा निर्धारित कालमर्यादेत लोकसेवा दिली नसेल, अशा अर्जदाराने अर्ज फेटाळल्याच्या आदेशाच्या किंवा कालमर्यादा संपल्याच्या तारखेपासून 30 दिवसांच्या आत प्रथम अपीलीय अधिकाऱ्यांकडे अपील दाखल करावे.</li>
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
        mahanagar: "",
        district: "",
        wardNo: "",
        nagarpalika: "",
        sahagruh: "",
        wiksit: ""
    });

    const [checkedItems, setCheckedItems] = useState({
        aadhaar: false,
        pancard: false,
    });

    const [tempSelectedDoc, setTempSelectedDoc] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isDocumentModalVisible, setDocumentModalVisible] = useState(false);
    const [isFileUploadModalVisible, setFileUploadModalVisible] = useState(false);
    const [uploadType, setUploadType] = useState(""); // "accept" or "reject"
    const [file, setFile] = useState(null);
    const [remark, setRemark] = useState("");

    // Simulated document images
    const docImages = {
        aadhaar: 'https://legaldbol.com/wp-content/uploads/2019/03/27-Creative-Aadhar-Card-Template-Download-Download-for-Aadhar-Card-Template-Download.jpg',
        pancard: 'https://www.thestatesman.com/wp-content/uploads/2019/07/pan-card.jpg',
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setTempSelectedDoc(name);
        setSelectedDoc(name);
        setDocumentModalVisible(true);
    };

    const handleAccept = () => {
        if (tempSelectedDoc) {
            setCheckedItems((prev) => ({
                ...prev,
                [tempSelectedDoc]: true,
            }));
        }
        setTempSelectedDoc(null);
        setDocumentModalVisible(false);
    };

    const handleReject = () => {
        setCheckedItems((prev) => ({
            ...prev,
            [tempSelectedDoc]: false, // Uncheck if "Cancel"
        }));
        setTempSelectedDoc(null);
        setDocumentModalVisible(false);
    };

    const handleShowFileUploadModal = (type) => {
        setUploadType(type);
        setFileUploadModalVisible(true);
    };

    const handleCloseFileUploadModal = () => {
        setFileUploadModalVisible(false);
        setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) return alert("Please upload a file.");

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("action", uploadType);
        uploadFormData.append("remark", remark); // ✅ Include the remark

        try {
            await axios.post("http://localhost:5000/upload", uploadFormData);
            alert(`${uploadType.toUpperCase()} submitted successfully`);
            handleCloseFileUploadModal();
            setRemark(""); // Optional: reset remark after upload
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        }
    };


    // Check if both checkboxes are checked
    const allChecked = checkedItems.aadhaar && checkedItems.pancard;

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-start gap-3' style={{ width: '98%' }}>
                <div className='leftside w-75 h-100'>
                    <CertificateStage formData={formData} />
                </div>
                <div className='rightside w-25' style={{ height: '80vh' }}>
                    <div className="d-flex flex-column justify-content-between" style={{ height: '100%', width: '100%', border: "1px solid #ccc", padding: "10px" }}>
                        <div>
                            <div className="container mt-3">
                                <h2><b>View Document</b></h2>

                                {/* Checkboxes for Aadhaar and Pancard */}
                                <Form.Check
                                    className="m-2"
                                    type="checkbox"
                                    label="Aadhaar"
                                    name="aadhaar"
                                    checked={checkedItems.aadhaar}
                                    onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                    className="m-2"
                                    type="checkbox"
                                    label="Pancard"
                                    name="pancard"
                                    checked={checkedItems.pancard}
                                    onChange={handleCheckboxChange}
                                />

                                {/* Document Viewer Modal */}
                                <Modal show={isDocumentModalVisible} onHide={handleReject} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Document Viewer</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="d-flex justify-content-center align-items-center">
                                        <div
                                            className="d-flex justify-content-center align-items-center overflow-auto"
                                            style={{ height: '60vh', width: '100%' }}
                                        >
                                            {selectedDoc && docImages[selectedDoc] ? (
                                                <img
                                                    src={docImages[selectedDoc]}
                                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                                    alt={`${selectedDoc} Card`}
                                                />
                                            ) : (
                                                <p>No document available.</p>
                                            )}
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleReject}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleAccept}>
                                            Done
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>

                        {/* Accept/Reject Buttons */}
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-danger btn-sm"
                                style={{ width: "48%" }}
                                onClick={() => handleShowFileUploadModal("reject")}
                                disabled={!allChecked}
                            >
                                REJECT
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                style={{ backgroundColor: "#7caeff", width: "48%" }}
                                onClick={() => handleShowFileUploadModal("accept")}
                                disabled={!allChecked}
                            >
                                ACCEPT
                            </button>
                        </div>

                        {/* File Upload Modal */}
                        <Modal show={isFileUploadModalVisible} onHide={handleCloseFileUploadModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{uploadType.toUpperCase()} - Upload File</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ height: '40vh' }}>
                                <div className="h-100 w-100 d-flex justify-content-center align-items-center gap-4 flex-column">
                                    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                                        <input type="file" className="w-50" onChange={handleFileChange} />
                                    </div>
                                    <div className="w-100">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Enter Remark" rows="2" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseFileUploadModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Done
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeptForm;
