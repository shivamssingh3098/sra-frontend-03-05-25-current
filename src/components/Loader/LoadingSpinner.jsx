import React from 'react';

const LoadingSpinner = ({ size = 50, color = '#3498db' }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size * 0.1}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${size * 0.1}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s ease-in-out infinite',
    margin: 'auto',
  };

  return (
    <>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default LoadingSpinner;
