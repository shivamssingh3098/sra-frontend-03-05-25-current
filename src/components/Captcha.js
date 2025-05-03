import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useEffect } from 'react';
import { FaSync } from 'react-icons/fa';

const Captcha = ({ onChange }) => {
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    onChange(result); // Send value to parent
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="captcha-section space-y-2">
      <div className="text-sm text-gray-600">Enter the captcha shown below</div>
      <div className="captcha-box flex items-center gap-2">
        <button
          type="button"
          className="reload-btn p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          onClick={generateCaptcha}
          title="Reload Captcha"
        >
          <FaSync className="text-blue-600" />
        </button>
        <div className="captcha-text flex-1 p-2 bg-gray-100 rounded-lg text-center font-mono">
          {captchaText}
        </div>
      </div>
    </div>
  );
};

export default Captcha;
