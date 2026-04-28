import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const roleDefaultRoutes = {
  ADMIN: "/admin/dashboard",
  EMPLOYEE: "/employee/jobs",
  EMPLOYER: "/employer/my-jobs",
};

export default function PublicRoute({ children }) {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    const redirectTo = roleDefaultRoutes[userRole] || "/";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}