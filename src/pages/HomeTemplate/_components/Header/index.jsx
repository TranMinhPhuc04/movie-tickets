import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center mt-5">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Movie Tickets" className="h-10 w-10 mr-2" />
          <h1 className="text-xl font-bold text-blue-800">MovieTickets</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/list-movie"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }`
            }
          >
            Phim đang chiếu
          </NavLink>
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }`
            }
          >
            Lịch chiếu
          </NavLink>
          <NavLink
            to="/promotions"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }`
            }
          >
            Ưu đãi
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition duration-300 ${
                isActive
                  ? "text-blue-800 font-semibold"
                  : "text-gray-800 hover:text-blue-800"
              }`
            }
          >
            Liên hệ
          </NavLink>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Đăng nhập
          </button>
          <button className="hidden md:block border border-blue-800 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-800 hover:text-white transition duration-300">
            Đăng ký
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-blue-800 focus:outline-none">
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
      </div>
    </header>
  );
};

export default Header;
