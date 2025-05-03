import React, { useEffect, useState } from 'react'
import UserForm from '../../UserForm/Form'
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate, navigate } from "react-router-dom";

// Import Form components
import Form1 from "../../UserForm1/Form1";
import Form2 from "../../UserForm2/Form2";
import Form3 from "../../UserForm3/Form3";
import Form4 from "../../UserForm4/Form4";
import Form5 from "../../UserForm5/Form5";
import Form6 from "../../UserForm6/Form6";
import Form7 from "../../UserForm7/Form7";
import Form8 from "../../UserForm8/Form8";
import Form9 from "../../UserForm9/Form9";
import Form10 from "../../userForm10/Form10";
import Form11 from "../../userForm11/Form11";
import Form12 from "../../userForm12/Form12";
import Form13 from "../../userForm13/Form13";
import Form14 from "../../userForm14/Form14";
import Form15 from "../../userForm15/Form15";
import Form16 from "../../userForm16/Form16";
import Form17 from "../../userForm17/Form17";
import Form18 from "../../userForm18/Form18";
import Form19 from "../../userForm19/Form19";
import Form20 from "../../userForm20/Form20";
import Form21 from "../../userForm21/Form21";
import Form22 from "../../userForm22/Form22";

const ApplicationApproval = ({ formData }) => {
  const location = useLocation();
  console.log("Application info", location.state)
  const { app } = location.state;
  const [applicationInfo, setApplicationInfo] = useState(app);
  const [documentList, setDocumentList] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); // Track which checkbox is being clicked
  const [checkedCheckboxes, setCheckedCheckboxes] = useState({}); // Store checked status for all checkboxes
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [acceptRejectBtnEnable, setAcceptRejectBtnEnable] = useState(false);
  const [acceptRejectBtnHide, setAcceptRejectBtnHide] = useState(false);

  // Open modal when checkbox or label is clicked
  const handleCheckboxClick = (labelText, imageUrl) => {
    setSelectedCheckbox(labelText);  // Save which checkbox was clicked
    setSelectedImageUrl(imageUrl);   // Save the image URL (new state)
    setIsModalOpen(true);
    setModalTitle(labelText);
  };
  useEffect(() => {
    if (applicationInfo)
      fetchApplicationData(applicationInfo?._id);
  }, [applicationInfo]);
  useEffect(() => {

    if (applicationData) {
      console.log("Department testing : Application data changed :", applicationData);
    }
  }, [applicationData]);
  const token = localStorage.getItem("accessToken");
  const fetchApplicationData = async (formId) => {
    console.log("Department testing : call api for application information by form id");
    const response = await axios.get(
      "/api/v1/department-managers/get-specific-form-data",
      {
        params: {
          formId: formId,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Department testing: get api for application information by form id", response.data);

    setDocumentList(response.data.data[0]?.documents?.documentList);
    const data = response.data.data[0];

    const formattedDate = data.applyDate
      ? new Date(data.applyDate).toLocaleDateString("en-IN")
      : "";

    // setFormData({
    //   ...data,
    //   applyDate: formattedDate,
    // });
    const signatureObj = data?.documents?.documentList.find(doc => doc.hasOwnProperty("Signature"));
    const signatureUrl = signatureObj ? signatureObj["Signature"] : null;

    setApplicationData({
      ...data,
      applyDate: formattedDate,
      signature: signatureUrl
    });
  };
  const [action, setAction] = useState('');
  const handleAcceptRejectClick = (action) => {
    console.log("Department testing : " + action + " Action clicked");
    setAction(action);
    setIsRejectModalOpen(true);
  };
  // Close modal and reset checkbox state
  const handleCloseModal = () => {
    setIsModalOpen(false);
    //setIsChecked(false); // Uncheck the checkbox
  };
  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
  };

  // Handle Done button
  const handleDone = () => {
    setCheckedCheckboxes((prev) => ({
      ...prev,
      [selectedCheckbox]: true,   // Mark that particular checkbox as checked
    }));
    setSelectedCheckbox(null);     // Clear selected checkbox
    setIsModalOpen(false);          // Close modal
  };
  useEffect(() => {
    console.log("department testing : checkbox functionality", checkedCheckboxes);
    const allChecked = documentList.length > 0 &&
      documentList.every(doc => {
        const key = Object.keys(doc)[0];
        return checkedCheckboxes[key];
      });
    console.log("department testing : Is all checkbox checked ?", allChecked);
    if (allChecked)
      setAcceptRejectBtnEnable(true);
    else
      setAcceptRejectBtnEnable(false);
  }, [checkedCheckboxes]);

  
  const [isLoading, setIsLoading] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleAcceptRejectAction = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    if (uploadedFile) {
      formData.append("document", uploadedFile);
    }
    formData.append("remark", remarks);
    formData.append("serviceStatus", action);
    formData.append("addedByPerson", localStorage.getItem("userType"));
    formData.append("addedByPersonId", localStorage.getItem("UserId"));
    formData.append("formId", applicationData?._id);
    
  
    try {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };
  
      const response = await axios.post('/api/v1/department-managers/create-remark', formData, config);
      console.log("Submission response:", response.data);
      // Optionally redirect or show a success message here
      setIsRejectModalOpen(false);
      if(response.data?.success)
        alert(`Application has been successfully ${action === "ACCEPTED" ? 'Accepted.' : 'Rejected.'}`);
      navigate('/admin')
    } catch (error) {
      console.error("Submission error:", error);
    }
  };
  
  // const handleAcceptRejectClick = async (formId) => {
  //   if (!formId) return;

  //   // Log the data being sent
  //   console.log("Department testing : accept api call with form Id:", formId);
  //   const submitData = {
  //     "serviceStatus": "ACCEPTED",
  //     "_id": formId
  //   };
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     // Add axios configuration
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       withCredentials: true,
  //     };

  //     const response = await axios.patch(
  //       "https://sra-government-project-thane-1.onrender.com/api/v1/department-managers/accept-form-request",
  //       submitData,
  //       config
  //     );

  //     console.log("Department testing : After accept api call and  Response:", response);
  //     if (response.data?.success) {
  //       navigate('/admin')
  //     }
  //   } catch (error) {
  //     console.error('Department testing : Accept and reject api calling and Error:', error);
  //     // Handle error (show toast maybe)
  //   } finally {
  //     //setIsLoading(false); // done loading
  //   }

  // };
  return (
    <div style={{ display: 'flex', height: '100vh', marginTop: '1rem' }}>

      {/* First Panel (8/12) */}
      <div style={{ flex: 8, padding: '10px', border: '1px solid #ccc', overflowY: 'auto' }}>
        {applicationData && (app?.serviceNumber == 1 ? (
          <Form1 formData={applicationData} />
        ) : app?.serviceNumber == 2 ? (
          <Form2 formData={applicationData} />
        ) : app?.serviceNumber == 3 ? (
          <Form3 formData={applicationData} />
        ) : app?.serviceNumber == 4 ? (
          <Form4 formData={applicationData} />
        ) : app?.serviceNumber == 5 ? (
          <Form5 formData={applicationData} />
        ) : app?.serviceNumber == 6 ? (
          <Form6 formData={applicationData} />
        ) : app?.serviceNumber == 7 ? (
          <Form7 formData={applicationData} />
        ) : app?.serviceNumber == 8 ? (
          <Form8 formData={applicationData} />
        ) : app?.serviceNumber == 9 ? (
          <Form9 formData={applicationData} />
        ) : app?.serviceNumber == 10 ? (
          <Form10 formData={applicationData} />
        ) : app?.serviceNumber == 11 ? (
          <Form11 formData={applicationData} />
        ) : app?.serviceNumber == 12 ? (
          <Form12 formData={applicationData} />
        ) : app?.serviceNumber == 13 ? (
          <Form13 formData={applicationData} />
        ) : app?.serviceNumber == 14 ? (
          <Form14 formData={applicationData} />
        ) : app?.serviceNumber == 15 ? (
          <Form15 formData={applicationData} />
        ) : app?.serviceNumber == 16 ? (
          <Form16 formData={applicationData} />
        ) : app?.serviceNumber == 17 ? (
          <Form17 formData={applicationData} />
        ) : app?.serviceNumber == 18 ? (
          <Form18 formData={applicationData} />
        ) : app?.serviceNumber == 19 ? (
          <Form19 formData={applicationData} />
        ) : app?.serviceNumber == 20 ? (
          <Form20 formData={applicationData} />
        ) : app?.serviceNumber == 21 ? (
          <Form21 formData={applicationData} />
        ) : app?.serviceNumber == 22 ? (
          <Form22 formData={applicationData} />
        ) : null)}
      </div>

      {/* Second Panel (4/12) */}
      <div style={{ flex: 4, padding: '10px', border: '1px solid #ccc', overflowY: 'auto' }}>

        {/* Form Heading */}
        <h4 className="text-center mb-4">Listed Documents</h4>

        {/* Vertical Checkbox List */}
        {/* Vertical Checkbox List */}
        <div className="mb-4">
          {documentList && documentList.map((doc, index) => {
            const labelText = Object.keys(doc)[0];    // e.g., "Identity Card"
            const imageUrl = Object.values(doc)[0];   // e.g., "https://..."
            const isAccepted = app?.serviceStatus === "ACCEPTED";
            return (
              <div
                className="form-check mb-3"
                key={index}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <input
                  className="form-check-input custom-checkbox"
                  type="checkbox"
                  id={`checkbox${labelText}`}
                  checked={isAccepted || checkedCheckboxes[labelText] || false}
                  onChange={() => { }}
                  onClick={() => handleCheckboxClick(labelText, imageUrl)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox${labelText}`}
                  style={{ fontSize: '1.1rem', cursor: 'pointer' }}
                  onClick={() => handleCheckboxClick(labelText, imageUrl)}
                >
                  {labelText}
                </label>
              </div>
            );
          })}


        </div>

        {/* Centered Approve and Reject Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <button type="submit" className="btn btn-success" hidden={app?.serviceStatus != "PENDING"} disabled={!acceptRejectBtnEnable} onClick={() => handleAcceptRejectClick('ACCEPTED')}>
            Accept
          </button>
          <button type="button" className="btn btn-danger"  hidden={app?.serviceStatus != "PENDING"} onClick={() => handleAcceptRejectClick('REJECTED')}>
            Reject
          </button>
        </div>


        {/* Custom Checkbox Styles */}
        <style jsx>{`
    .custom-checkbox {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }

    .custom-checkbox:checked {
      background-color: #0d6efd; /* Bootstrap primary blue */
      border-color: #0d6efd;
    }
  `}</style>
        {/* Bootstrap Modal */}
        <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} />
              </div>
              {/* Modal Body with Image */}
              <div className="modal-body">
                <img
                  src={selectedImageUrl}
                  alt="Modal Image"
                  className="img-fluid"
                  style={{ display: 'block', margin: 'auto', width: '100%', height: 'auto' }}
                />
              </div>
              {/* Modal Footer with Buttons */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleDone}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstrap Modal */}
        <div
          className={`modal fade ${isRejectModalOpen ? 'show' : ''}`}
          style={{
            display: isRejectModalOpen ? 'block' : 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Modal background shadow
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            overflowY: 'auto',
          }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <div className="modal-content">
              <form onSubmit={handleAcceptRejectAction}>
                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{action === "ACCEPTED" ? 'Accept' : 'Reject'} Action</h5>
                  <button type="button" className="btn-close" onClick={handleCloseRejectModal} />
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="fileUpload" className="form-label">Upload File</label>
                    <input
                      type="file"
                      className="form-control"
                      id="fileUpload"
                      onChange={(e) => setUploadedFile(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="remarks" className="form-label">Remarks</label>
                    <textarea
                      className="form-control"
                      id="remarks"
                      rows="4"
                      placeholder="Enter remarks..."
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer justify-content-end">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseRejectModal}>
                    Cancel
                  </button>
                  <button type="submit" className={`btn ${action === "ACCEPTED" ? 'btn-success' : 'btn-danger'}`}>
                    {action === "ACCEPTED" ? 'Accept' : 'Reject'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>


    </div>



  )
}

export default ApplicationApproval