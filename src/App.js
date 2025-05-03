import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ServiceForm from "./commponents/ServiceForm";
import MultiStepForm from "./commponents/MultiStepFrom";
import PaymentForm from "./components/PaymentForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserCourse from "./components/UserCourse";
import ServiceDetails from "./components/ServiceDetails";
import Home from "./components/Home";
// import UserForm from "./components/UserForm";
import { NavBar } from "./components/NavBar"; // ✅ Import your NavBar
import UserRegistrationForm from "./components/UserRegistrationForm";
import DeptForm from "./DepartmentComponent/DepartmentComponent/DeptForm";
import DashBoard from "./DepartmentComponent/DepartmentComponent/DashBoard";
import Remark from "./DepartmentComponent/DepartmentComponent/Remark";
import Form1 from "./UserForm1/Form1";
import Form2 from "./UserForm2/Form2";
import Form3 from "./UserForm3/Form3";
import Form4 from "./UserForm4/Form4";
import Form5 from "./UserForm5/Form5";
import Form6 from "./UserForm6/Form6";
import Form7 from "./UserForm7/Form7";
import Form8 from "./UserForm8/Form8";
import Form9 from "./UserForm9/Form9";
import Form10 from "./Forms/Form10";
import Form11 from "./Forms/Form11";
import Form12 from "./Forms/Form12";
import Form13 from "./Forms/Form13";
import Form14 from "./Forms/Form14";
import ServicesDashboard from "./components/ServiceDashboard";
import { UserProtectedRoute } from "./protected/UserProtectedRoute";
import DepartmentProtectedRoute from "./protected/DepartmentProtectedRoute";
import ServiceList from "./components/ServiceList";
import HomeOrLogin from "./components/HomeOrLogin";
import ApplicationForm from "./UserForm/ApplicationForm";
import ApplicationForm1 from "./UserForm1/ApplicationForm1";
import ApplicationForm2 from "./UserForm2/ApplicationForm2";
import ApplicationForm3 from "./UserForm3/ApplicationForm3";
import ApplicationForm4 from "./UserForm4/ApplicationForm4";
import ApplicationForm5 from "./UserForm5/ApplicationForm5";
import ApplicationForm6 from "./UserForm6/ApplicationForm6";
import ApplicationForm7 from "./UserForm7/ApplicationForm7";
import ApplicationForm8 from "./UserForm8/ApplicationForm8";
import ApplicationForm9 from "./UserForm9/ApplicationForm9";
import ServiceDasborad from "./components/ServiceDashboard";
import ApplicationForm10 from "./userForm10/ApplicationForm10";
import ApplicationForm11 from "./userForm11/ApplicationForm11";
import ApplicationForm12 from "./Application/ApplicationForm12";
import ApplicationForm13 from "./userForm13/ApplicationForm13";
import ApplicationForm14 from "./userForm14/ApplicationForm14";
import ApplicationForm15 from "./userForm15/ApplicationForm15";
import ApplicationForm16 from "./userForm16/ApplicationForm16";
import ApplicationForm17 from "./userForm17/ApplicationForm17";
import ApplicationForm18 from "./userForm18/ApplicationForm18";

import ApplicationForm19 from "./userForm19/ApplicationForm19";
import ApplicationForm20 from "./userForm20/ApplicationForm20";
import ApplicationForm21 from "./userForm21/ApplicationForm21";

import CertifiedRenDepositForm from "./commponents/CertifiedRenDepositForm";
import CertifiedRenDepositList from "./commponents/CertifiedRenDepositList";

import ApplicationForm22 from "./userForm22/ApplicationForm22";
import Form22 from "./userForm22/Form22";
import ApplicationApproval from "./DepartmentComponent/DepartmentComponent/ApplicationApproval";
import ThankYou from "./UserForm/Thankyou";

function App() {
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

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="py-8">
          <Routes>
            <Route path="/" element={<HomeOrLogin />} />
            <Route path="/register" element={<UserRegistrationForm />} />

            <Route
              path="/deptdas"
              element={
                <DepartmentProtectedRoute>
                  <DashBoard />
                </DepartmentProtectedRoute>
              }
            />

            <Route path="/userdashboard" element={<ServiceDasborad />} />
            <Route path="/form" element={<MultiStepForm />} />

            <Route path="/form1" element={<MultiStepForm />} />

            <Route
              path="/admin"
              element={
                <DepartmentProtectedRoute>
                  <AdminDashboard />
                </DepartmentProtectedRoute>
              }
            />

            <Route
              path="/services"
              element={
                <UserProtectedRoute>
                  <ServiceList />
                </UserProtectedRoute>
              }
            />
            <Route path="/userdashboard" element={<ServiceDasborad />} />
            <Route path="/form" element={<MultiStepForm />} />
            <Route path="/form1" element={<MultiStepForm />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deptdas" element={<DashBoard />} />
            
            <Route path="/services" element={<ServicesDashboard />} />
            <Route path="/courses" element={<UserCourse />} />
            <Route path="/deptform" element={<DeptForm />} />
            <Route path="/remarks" element={<Remark />} />
            <Route path="/applicationapproval" element={<ApplicationApproval />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/form3" element={<Form3 />} />
            <Route path="/form4" element={<Form4 />} />
            <Route path="/form5" element={<Form5 />} />
            <Route path="/form6" element={<Form6 />} />
            <Route path="/form7" element={<Form7 />} />
            <Route path="/form8" element={<Form8 />} />
            <Route path="/form9" element={<Form9 />} />
            <Route path="/form10" element={<Form10 />} />
            <Route path="/form11" element={<Form11 />} />
            <Route path="/form12" element={<Form12 />} />
            <Route path="/form13" element={<Form13 />} />
            <Route path="/form14" element={<Form14 />} />
            <Route path="/form22" element={<Form22 />} />

            <Route
              path="/application"
              element={<ApplicationForm formData={FormData} />}
            />

            {/* <Route
              path="/application1"
              element={<ApplicationForm1 formData={FormData} />}
            /> */}
            <Route
              path="/application2"
              element={<ApplicationForm2 formData={FormData} />}
            />
            <Route
              path="/application3"
              element={<ApplicationForm3 formData={FormData} />}
            />
            <Route
              path="/application4"
              element={<ApplicationForm4 formData={FormData} />}
            />
            <Route
              path="/application5"
              element={<ApplicationForm5 formData={FormData} />}
            />
            <Route
              path="/application6"
              element={<ApplicationForm6 formData={FormData} />}
            />
            <Route
              path="/application7"
              element={<ApplicationForm7 formData={FormData} />}
            />
            <Route
              path="/application8"
              element={<ApplicationForm8 formData={FormData} />}
            />
            <Route
              path="/application9"
              element={<ApplicationForm9 formData={FormData} />}
            />
            <Route
              path="/application10"
              element={<ApplicationForm10 formData={FormData} />}
            />
            <Route
              path="/application11"
              element={<ApplicationForm11 formData={FormData} />}
            />
            <Route
              path="/application12"
              element={<ApplicationForm12 formData={FormData} />}
            />
            <Route
              path="/application13"
              element={<ApplicationForm13 formData={FormData} />}
            />
            {/* <Route
              path="/application14"
              element={<ApplicationForm14 formData={FormData} />}
            /> */}
            <Route
              path="/application15"
              element={<ApplicationForm15 formData={FormData} />}
            />
            <Route
              path="/application16"
              element={<ApplicationForm16 formData={FormData} />}
            />
            <Route
              path="/application17"
              element={<ApplicationForm17 formData={FormData} />}
            />
            <Route
              path="/application18"
              element={<ApplicationForm18 formData={FormData} />}
            />
            <Route
              path="/application19"
              element={<ApplicationForm19 formData={FormData} />}
            />
            <Route
              path="/application20"
              element={<ApplicationForm20 formData={FormData} />}
            />
            <Route
              path="/application21"
              element={<ApplicationForm21 formData={FormData} />}
            />

            <Route
              path="/CertifiedRenDepositForm"
              element={<CertifiedRenDepositForm />}
            />
            <Route
              path="/certified-rent-deposits"
              element={<CertifiedRenDepositList />}
            />

            <Route
              path="/application22"
              element={<ApplicationForm22 formData={FormData} />}
            />
          <Route
            path="/thank"
            element={<ThankYou/>}>
          </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
