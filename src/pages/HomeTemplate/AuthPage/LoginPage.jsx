import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import { AuthContext } from "../../../contexts/AuthContext";
import { message } from "antd";
import ROUTES from "../../../constants/routes";

const LoginPage = () => {
  const [formData, setFormData] = useState({ taiKhoan: "", matKhau: "" });
  const [error, setError] = useState(""); // Hiển thị lỗi nếu đăng nhập thất bại
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(formData);
      const userData = response.data.content;

      // Gọi hàm login từ AuthContext
      login(userData);

      // Chuyển hướng dựa trên role
      if (userData.maLoaiNguoiDung === "QuanTri") {
        message.success("Đăng nhập admin thành công!");
        navigate(ROUTES.MOVIE); // Điều hướng đến trang admin
      } else {
        message.success("Đăng nhập thành công!");
        navigate("/"); // Điều hướng đến trang người dùng
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="taiKhoan" className="block text-gray-700 mb-2">
              Tài khoản
            </label>
            <input
              type="text"
              id="taiKhoan"
              name="taiKhoan"
              value={formData.taiKhoan}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Nhập tài khoản"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="matKhau" className="block text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Bạn chưa có tài khoản?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
