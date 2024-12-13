import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ROUTES from "../constants/routes";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Thêm trạng thái để kiểm tra

  const location = useLocation();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const userAdmin = localStorage.getItem("USER_ADMIN");

    if (userAdmin) {
      setIsAuthenticated(true); // Đã đăng nhập
    } else {
      setIsAuthenticated(false); // Chưa đăng nhập
    }
    setIsChecking(false); // Hoàn thành kiểm tra
  }, [location]); // Chạy lại khi vị trí thay đổi

  if (isChecking) {
    // Hiển thị trạng thái đang kiểm tra
    return <p>Đang kiểm tra xác thực...</p>;
  }

  if (!isAuthenticated) {
    // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  // Render nội dung của PrivateRoute nếu đã xác thực
  return <>{children}</>;
};

export default PrivateRoute;
