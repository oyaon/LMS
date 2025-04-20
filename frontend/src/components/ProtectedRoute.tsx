import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactElement;
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
