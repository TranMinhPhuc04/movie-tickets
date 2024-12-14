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
      setRole(parsedUser.maLoaiNguoiDung); // Gán role từ dữ liệu người dùng
    }
  }, []);

  const login = (userData) => {
    if (!userData) {
      console.error("Thông tin đăng nhập không hợp lệ!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setRole(userData.maLoaiNguoiDung); // Cập nhật role
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
