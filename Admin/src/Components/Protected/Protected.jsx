// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = ({ element: Component }) => {
    const { jwt } = useSelector((state) => state.auth);
    const location = useLocation();
  
    if (jwt === undefined) {
      // Optionally show a loading spinner or something similar
      return <div>Loading...</div>;
    }
  
    return jwt ? (
      Component
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };
export default Protected;
