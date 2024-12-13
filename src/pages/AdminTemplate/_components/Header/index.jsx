import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import ROUTES from "../../../../constants/routes";

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Lấy thông tin user từ AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext
    navigate(ROUTES.ADMIN_LOGIN); // Điều hướng đến trang đăng nhập admin
  };

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.MOVIE); // Nếu không có user, điều hướng về trang login
    }
  }, [user, navigate]);

  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center shadow">
      {/* Logo và Tiêu đề */}
      <Link to={ROUTES.MOVIE} className="text-xl font-bold hover:text-gray-300">
        Admin Dashboard
      </Link>

      {/* Hiển thị thông tin user hoặc trạng thái đăng nhập */}
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>
              Chào, <strong>{user.hoTen || "Admin"}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <span className="text-gray-300">Đang tải...</span>
        )}
      </div>
    </header>
  );
};

export default Header;
