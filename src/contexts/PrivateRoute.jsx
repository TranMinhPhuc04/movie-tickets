import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../constants/routes";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("USER_ADMIN");

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  // Nếu đã đăng nhập, render nội dung
  return <Outlet />;
};

export default PrivateRoute;
