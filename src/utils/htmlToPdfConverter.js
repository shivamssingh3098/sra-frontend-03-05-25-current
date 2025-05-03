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

  html2canvas(input, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pxToMm = 0.264583;
    const pdfWidth = canvas.width * pxToMm;
    const pdfHeight = canvas.height * pxToMm;

    const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  });
};

export default htmlToPdfConverter;