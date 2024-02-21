import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    // Redirect to the login page if not logged in
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
