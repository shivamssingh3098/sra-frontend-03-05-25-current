import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          We sincerely appreciate your submission. Your request has been received and is being processed.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
