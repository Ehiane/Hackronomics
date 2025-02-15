import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
