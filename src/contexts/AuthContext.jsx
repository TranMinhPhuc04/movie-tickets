import { message } from "antd";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData) => {
    // Kiểm tra quyền truy cập
    if (userData.maLoaiNguoiDung !== "KhachHang") {
      message.error("Bạn không có quyền truy cập!");
      throw new Error("Unauthorized access");
    }

    // Lưu vào localStorage nếu hợp lệ
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    message.success("Đăng nhập thành công");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
