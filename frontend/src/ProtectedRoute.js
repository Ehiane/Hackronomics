import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @param {Object} props
 * @param {JSX.Element} props.element 
 * @param {string[]} [props.allowedRoles] 
 */
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // role is stored on login

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;