import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/css/Home.css";
import servicesData from "../data/services.json";


// Import images
import logo from "../images/logo.png";
import serviceIcon from "../images/logo.png";
import devendraFadnavis from "../images/Shri.Devendra.jpg";
import eknathShinde from "../images/Eknath-Shinde.jpg";
import ajitPawar from "../images/ajitpawar.jpg";
import Pankaj from "../images/Pankaj.png";
import backgroundImage from "../images/background.jpg";

// Import React Icons
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineSetting,
  AiOutlineMail,
  AiOutlineAppstore,
} from "react-icons/ai";
import { BiHelpCircle, BiMenu } from "react-icons/bi";
import { MdDashboard, MdSearch, MdLock } from "react-icons/md";
import { FaUserPlus, FaSignInAlt, FaUser, FaKey, FaSync } from "react-icons/fa";

import OfficerLogin from "../components/OfficerLogin";
import UserForm from "../components/UserForm";
import UserLoginForm from "./UserLoginForm";

function Home() {
  const services = servicesData[0].services
  const [activeNav, setActiveNav] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const loginSectionRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [showOfficerLogin, setShowOfficerLogin] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const navigate = useNavigate();

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    navRef.current?.classList.toggle("nav-active");
    menuButtonRef.current?.classList.toggle("toggle");
  };

  const generateCaptcha = () => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleShowSignup = () => {
    navigate("/register");
  };

  const toggleOfficerLogin = () => {
    setShowOfficerLogin(!showOfficerLogin);
    setShowUserForm(false);
  };

  const handleSwitchToUser = () => {
    setShowOfficerLogin(false);
    setShowUserForm(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="page-wrapper min-h-screen">
      <main className="main-content container mx-auto px-4 pt-24 pb-8 "   style={{
    backgroundImage: "url('https://images.indianexpress.com/2019/02/slums.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
        <div className="flex overflow-x-hidden flex-col items-center text-center gap-8 lg:flex-row lg:items-start lg:text-left">
          {/* Services Section */}
          <div className="services-section animate-fade-in w-full max-w-md lg:max-w-none lg:w-[60%]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              {/* <MdSearch className="text-blue-600" />  */}
              SERVICES NAME
            </h2>
            {/* <div className="search-box relative mb-6">
              <MdSearch className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-blue-100 font-semibold text-blue-800 text-sm lg:text-base">
            <div className="col-span-1 text-center">क्र.</div>
            <div className="col-span-11">सेवा वर्णन</div>
          </div>
          <div className="max-h-[600px] overflow-y-auto scrollbar-hide divide-y divide-gray-200">
  {services.map((service) => (
    <div
      key={service.id}
      className="grid grid-cols-12 gap-4 py-5 px-6 hover:bg-gray-100 transition-all duration-200 ease-in-out"
    >
      <div className="col-span-1 text-center font-medium text-blue-600 text-sm lg:text-lg">
        {service.id}
      </div>
      <div className="col-span-11 text-gray-700 text-sm lg:text-lg">
        {service.description}
      </div>
    </div>
  ))}
</div>

        </div>

          </div>

          {/* Login Section */}
          <section
            className="login-section w-full max-w-md lg:max-w-none lg:w-100"
            ref={loginSectionRef}
          >
            {showOfficerLogin ? (
              <OfficerLogin onSwitchToUser={handleSwitchToUser} />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaUser className="text-blue-600" /> LOG IN / REGISTER
                </h2>
                <div className="login-options flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    className="register-btn bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    onClick={handleShowSignup}
                  >
                    <FaUserPlus className=" h-[50px] w-[50px]" /> NEW USER REGISTER HERE
                  </button>
                  <button
                    className="login-btn bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    onClick={toggleOfficerLogin}
                  >
                    <FaSignInAlt className=" h-[50px] w-[50px]" /> OFFICER LOGIN
                  </button>
                </div>
                <div className="login-form bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MdLock className="text-blue-600" /> Already Registered
                    login here
                  </h3>
                  <UserLoginForm />
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
