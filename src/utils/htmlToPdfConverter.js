// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const loadImages = (element) => {
//   const images = element.querySelectorAll("img");
//   const promises = Array.from(images).map((img) => {
//     if (!img.complete) {
//       return new Promise((resolve) => {
//         img.onload = img.onerror = resolve;
//       });
//     }
//     return Promise.resolve();
//   });
//   return Promise.all(promises);
// };

// const htmlToPdfConverter = async (elementId, fileName = "document") => {
//   const input = document.getElementById(elementId);
//   if (!input) {
//     console.error("Element not found:", elementId);
//     return;
//   }

//   await loadImages(input);

// // shivam code
// // Set width to match A4 size
//   const originalWidth = input.style.width;
//   input.style.width = "794px"; // 210mm at 96dpi

//   // end shviam code

//   html2canvas(input, {
//     scale: 2,
//     useCORS: true,
//     allowTaint: false,
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pxToMm = 0.264583;
//     const pdfWidth = canvas.width * pxToMm;
//     const pdfHeight = canvas.height * pxToMm;

//     const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${fileName}.pdf`);
//   });
// };

// export default htmlToPdfConverter;

// testing code from here

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const loadImages = (element) => {
  const images = element.querySelectorAll("img");
  const promises = Array.from(images).map((img) => {
    if (!img.complete) {
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    }
    return Promise.resolve();
  });
  return Promise.all(promises);
};

const htmlToPdfConverter = async (elementId, fileName = "document") => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error("Element not found:", elementId);
    return;
  }

  await loadImages(input);

  // Set width to match A4 size
  const originalWidth = input.style.width;
  input.style.width = "794px"; // 210mm at 96dpi

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    windowWidth: 794, // ensure consistent render
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfImgWidth = pageWidth;
  const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width;

  let position = 0;

  // If content is longer than one page, split it
  if (pdfImgHeight > pageHeight) {
    while (position < pdfImgHeight) {
      pdf.addImage(imgData, "PNG", 0, -position, pdfImgWidth, pdfImgHeight);
      position += pageHeight;
      if (position < pdfImgHeight) {
        pdf.addPage();
      }
    }
  } else {
    pdf.addImage(imgData, "PNG", 0, 0, pdfImgWidth, pdfImgHeight);
  }

  pdf.save(`${fileName}.pdf`);

  // Restore original width
  input.style.width = originalWidth;
};

export default htmlToPdfConverter;
