import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext"; // Import AuthContext

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Lấy user và hàm logout từ AuthContext
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout(); // Gọi hàm logout từ AuthContext
    navigate("/"); // Chuyển hướng về trang chủ sau khi đăng xuất
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="./images/logo.jpg"
            alt="Movie Tickets"
            className="h-12 w-12 mr-2"
          />
          <span className="text-xl font-bold text-blue-800">MOVIE TICKET</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-lg font-semibold">
          <button className="text-gray-800 hover:text-blue-800 transition duration-300">
            Đang Chiếu
          </button>
          <button className="text-gray-800 hover:text-blue-800 transition duration-300">
            Lịch Chiếu
          </button>
          <button className="text-gray-800 hover:text-blue-800 transition duration-300">
            Tin Tức
          </button>
          <button className="text-gray-800 hover:text-blue-800 transition duration-300">
            App
          </button>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-800">
                Xin chào, <strong>{user.hoTen || user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded text-red-800 border-red-800 hover:bg-red-800 hover:text-white transition duration-300"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleNavigateToLogin}
                className="px-4 py-2 border rounded text-blue-800 border-blue-800 hover:bg-blue-800 hover:text-white transition duration-300"
              >
                Đăng nhập
              </button>
              <button
                onClick={handleNavigateToRegister}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition duration-300"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
        <button
          className="md:hidden text-blue-800"
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
          aria-expanded={isMobileMenuOpen}
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-2 p-4 text-lg font-semibold">
            <button
              onClick={() => {
                navigate("/showtimes");
                closeMobileMenu();
              }}
            >
              Đang Chiếu
            </button>
            <button
              onClick={() => {
                navigate("/cinemas");
                closeMobileMenu();
              }}
            >
              Lịch Chiếu
            </button>
            <button
              onClick={() => {
                navigate("/news");
                closeMobileMenu();
              }}
            >
              Tin Tức
            </button>
            <button
              onClick={() => {
                navigate("/app");
                closeMobileMenu();
              }}
            >
              App
            </button>
            <div className="flex flex-col space-y-2 mt-4">
              {user ? (
                <>
                  <span className="text-center text-gray-800">
                    Xin chào, <strong>{user.hoTen || user.email}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 border rounded text-red-800 border-red-800 hover:bg-red-800 hover:text-white transition duration-300"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleNavigateToLogin();
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-2 border rounded text-blue-800 border-blue-800 hover:bg-blue-800 hover:text-white transition duration-300"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      handleNavigateToRegister();
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition duration-300"
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
