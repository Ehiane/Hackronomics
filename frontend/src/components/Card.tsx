import React, { ReactNode } from "react";

// Define the props interface for Card
interface CardProps {
  children: ReactNode;
  className?: string;
}

// Define the props interface for CardContent
interface CardContentProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 shadow-md rounded-lg ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => (
  <div>{children}</div>
);

export default Card;