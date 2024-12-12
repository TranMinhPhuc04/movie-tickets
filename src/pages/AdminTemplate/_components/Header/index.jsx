import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo và Tiêu đề */}
      <div className="flex items-center">
        <Link to="/admin" className="text-2xl font-bold">
          Admin Dashboard
        </Link>
      </div>

      {/* Thanh điều hướng và Nút Đăng xuất */}
      <div className="flex items-center space-x-4">
        <span>
          Xin chào, <strong>Admin</strong>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
