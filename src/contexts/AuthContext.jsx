import { message } from "antd";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.maLoaiNguoiDung); // Xác định role từ user
    }
  }, []);

  const login = (userData) => {
    if (!userData) {
      message.error("Thông tin đăng nhập không hợp lệ!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setRole(userData.maLoaiNguoiDung); // Phân biệt role
    message.success("Đăng nhập thành công!");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    message.success("Đăng xuất thành công!");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
