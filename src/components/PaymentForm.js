import CONFIG from "../app.config"; // adjust path as needed
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowQR(true);
    // Here you would typically integrate with a payment gateway
    console.log("Processing payment with:", selectedPayment, cardNumber);
    // Navigate to the form page after payment submission
    navigate("/form");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-4">
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Select Payment Option</h2>
        <p className="text-gray-500 text-sm mb-6">
          All transactions are secure and encrypted
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="paytm"
                checked={selectedPayment === "paytm"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="mr-3"
              />
              <span className="flex-1">Paytm</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                alt="Paytm"
                className="h-6"
              />
            </label>

            <label className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={selectedPayment === "credit"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">Credit card</span>
                <div className="flex gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="Amex"
                    className="h-6"
                  />
                </div>
              </div>
              {selectedPayment === "credit" && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">
                    Pay securely using your Visa, Maestro, Discover, or American
                    express card
                  </p>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 1234 1234 1234"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="19"
                  />
                </div>
              )}
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="phonepe"
                checked={selectedPayment === "phonepe"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="mr-3"
              />
              <span className="flex-1">PhonePe</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/PhonePe_Logo.svg"
                alt="PhonePe"
                className="h-6"
              />
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="googlepay"
                checked={selectedPayment === "googlepay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="mr-3"
              />
              <span className="flex-1">Google Pay</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                alt="Google Pay"
                className="h-6"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
            disabled={!selectedPayment}
          >
            Pay ₹10/-fee
          </button>
        </form>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Scan and pay</h2>
        <p className="text-gray-500 text-sm mb-6">
          All transactions are secure and encrypted
        </p>

        <div className="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <QRCodeSVG
              value="https://payment-gateway.com/pay/123456"
              size={256}
            />
          </div>
          <p className="mt-4 text-gray-500">scan from any UPI App</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
