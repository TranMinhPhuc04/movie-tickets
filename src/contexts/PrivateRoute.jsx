import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "../constants/routes";

const PrivateRoute = ({ allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(user.maLoaiNguoiDung)) {
    // Nếu role không được phép, điều hướng đến trang chính
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
