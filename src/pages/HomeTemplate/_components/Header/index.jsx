import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { AuthContext } from "../../../../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const userMenuItems = [
    {
      label: "Quản lý thông tin cá nhân",
      key: "profile",
      onClick: handleNavigateToProfile,
    },
    {
      label: "Đăng xuất",
      key: "logout",
      onClick: handleLogout,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="./images/logo.jpg"
              alt="Movie Tickets"
              className="h-10 w-10 mr-2"
            />
            <span className="text-lg font-bold text-blue-800">
              MOVIE TICKET
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <button
            onClick={() => navigate("/movies")}
            className="text-gray-800 hover:text-blue-800 transition"
          >
            Đang Chiếu
          </button>
          <button
            onClick={() => navigate("/showtimes")}
            className="text-gray-800 hover:text-blue-800 transition"
          >
            Lịch Chiếu
          </button>
          <button
            onClick={() => navigate("/news")}
            className="text-gray-800 hover:text-blue-800 transition"
          >
            Tin Tức
          </button>
          <button
            onClick={() => navigate("/app")}
            className="text-gray-800 hover:text-blue-800 transition"
          >
            App
          </button>
        </nav>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button className="text-gray-800 hover:text-blue-800 transition">
                Xin chào,{" "}
                <strong>{user?.hoTen || user?.email || "Người dùng"}</strong>
              </button>
            </Dropdown>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border rounded text-blue-800 border-blue-800 hover:bg-blue-800 hover:text-white transition"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-800"
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h18M3 6h18M3 18h18"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-4 text-base font-medium">
            <button
              onClick={() => {
                navigate("/movies");
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-800 hover:text-blue-800"
            >
              Đang Chiếu
            </button>
            <button
              onClick={() => {
                navigate("/showtimes");
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-800 hover:text-blue-800"
            >
              Lịch Chiếu
            </button>
            <button
              onClick={() => {
                navigate("/news");
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-800 hover:text-blue-800"
            >
              Tin Tức
            </button>
            <button
              onClick={() => {
                navigate("/app");
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-800 hover:text-blue-800"
            >
              App
            </button>
            <div className="flex flex-col space-y-2 border-t border-gray-300 mt-4 pt-4">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      handleNavigateToProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-800"
                  >
                    Thông tin cá nhân
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-800 hover:text-red-600"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
