import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../constants/routes";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const userAdmin = localStorage.getItem("USER_ADMIN");
    setIsAuthenticated(!!userAdmin); // true nếu có USER_ADMIN, ngược lại false
  }, []);

  if (!isAuthenticated) {
    // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  // Render nội dung của PrivateRoute nếu đã xác thực
  return <>{children}</>;
};

export default PrivateRoute;
