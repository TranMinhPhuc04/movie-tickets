import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import ROUTES from "../../../../constants/routes";

const Header = () => {
  const { adminUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  return (
    <header className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center">
      <Link to={ROUTES.MOVIE} className="text-xl font-bold">
        Admin Dashboard
      </Link>
      <div>
        {adminUser ? (
          <>
            <span>Chào, {adminUser.hoTen}</span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <span>Đang tải...</span>
        )}
      </div>
    </header>
  );
};

export default Header;
