import CONFIG from "../../app.config"; // adjust path as needed
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
// import './AdminRemarks .css';
import { BsBriefcaseFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Remark = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchApplications();
  }, []);
  const token = localStorage.getItem("accessToken");

  const fetchApplications = async () => {

    console.log("Making API request to fetch data...");
    const header = {
      "Authorization": "Bearer "
    }
    const response = await axios.get(CONFIG.API_BASE_URL +
      "/all-pending-request-for-certified-rent-deposit-copies2?page=1&limit=10&serviceStatus=PENDING", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    ).then(response => {
      console.log(response.data);
      console.log("API Response received:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });

      if (response.data && response.data?.data?.data.length > 0) {
        console.log("API response", response.data?.data?.data);
        setApplications(response.data?.data?.data);
      } else {
        console.log("No data found in response");
      }
      //setApplications(mockData);
      setError(null);
    })
      .catch(error => {
        setError('Failed to fetch applications. Please try again later.');
        console.error('Error fetching applications:', error);
      });

  };

  const handleViewApplication = (app) => {
    //navigate("/applicationapproval?id=" + id);
    navigate('/applicationapproval', { state: {  app } });
  };
  return (
    <div className="container mt-4 vh-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <b className='d-flex fs-4 align-items-center gap-2'>
          <BsBriefcaseFill />
          <p className="fs-4 mb-0">अकाउंट डिपार्टमेंट</p>
        </b>
      </div>

      <div className="remark-header d-flex align-items-center justify-content-between p-2" style={{ backgroundColor: '#2c3e7b' }}>
        <span className="text-white fw-bold ml-2"> REMARK FROM ADMIN</span>
        <div className="page-number-box">3</div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Table bordered responsive className="text-center">
        <thead className="text-white">
          <tr>
            <th style={{ backgroundColor: '#e12d40' }}>Sr.No</th>
            <th style={{ backgroundColor: '#e12d40' }}>Application ID</th>
            <th style={{ backgroundColor: '#e12d40' }}>Number of documents to be attached </th>
            <th style={{ backgroundColor: '#e12d40' }}>Whether payment has to be collected?</th>
            <th style={{ backgroundColor: '#e12d40' }}>Maximum days </th>
            <th style={{ backgroundColor: '#e12d40' }}>Expecting service delivery date </th>
            <th style={{ backgroundColor: '#e12d40' }}>Download application</th>

            <th style={{ backgroundColor: '#e12d40' }}>Status</th>
            <th style={{ backgroundColor: '#e12d40' }}>View Application</th>

          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {app.applicationId} <br /> {app.applicationId2}
              </td>
              <td>
                dummy
              </td>
              <td>
                dummy
              </td>
              <td>
                dummy
              </td>
              <td>
                dummy
              </td>
              <td>
                <Button variant="dark" size="sm" style={{ backgroundColor: '#2c3e7b' }}> Download</Button>
              </td>
              <td>
                <Button
                  variant={app.status === 'Accepted' ? 'success' : 'danger'}
                  size="sm"
                >
                  {app.serviceStatus}
                </Button>
              </td>
              <td>
                <Button variant="dark" size="sm" style={{ backgroundColor: '#2c3e7b' }} onClick={() => handleViewApplication(app)}>View Application</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Remark;
