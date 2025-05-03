import React from "react";

const CustomButton = ({
  variant = "primary",
  children,
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseStyles = "px-4 py-1  text-xs transition-colors duration-200";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-blue-200 text-blue-800 hover:bg-blue-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-300 text-black hover:bg-yellow-400",
    outline: "border border-red-600 text-red-600 hover:bg-red-50",
    black: "bg-transparent text-black hover:bg-gray-800 border border-black",
    disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
  };

  const buttonStyle = `${baseStyles} ${
    variants[disabled ? "disabled" : variant]
  } ${className}`;

  return (
    <button className={buttonStyle} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
