import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useRef, useEffect } from "react";
import htmlToPdfConverter from "../utils/htmlToPdfConverter";
import CustomButton from "../components/CustomButton";

const DownloadPDF = ({ fileName }) => {
  const downloadToPdf = () => {
    console.log("Downloading PDF for:", fileName);
    htmlToPdfConverter("formFinal", fileName);
  };
  return (
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
  );
};

export default DownloadPDF;
