import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = useSelector(selectUser);

  // Check if the user exists and if their role is included in the allowed roles
  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    // Redirect to login if not authorized
    return <Navigate to="/" />;
  }

  // Render the child components if authorized
  return <>{children}</>;
};

export default ProtectedRoute;
