import React, { ReactNode, ButtonHTMLAttributes } from "react";

// Define the props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
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
