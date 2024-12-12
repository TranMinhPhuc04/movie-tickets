import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import ROUTES from "../../../constants/routes";
import { message } from "antd";

const AdminLoginPage = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({
      ...adminCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userService.login(adminCredentials);
      const userInfo = response.data.content;

      // Kiểm tra quyền truy cập
      if (userInfo.maLoaiNguoiDung !== "QuanTri") {
        message.error("Bạn không có quyền truy cập Admin!");
        return;
      }

      // Lưu thông tin admin vào localStorage
      localStorage.setItem("USER_ADMIN", JSON.stringify(userInfo));
      console.log(
        "Lưu thành công:",
        JSON.parse(localStorage.getItem("USER_ADMIN"))
      );
      message.success("Đăng nhập thành công!");

      // Điều hướng đến trang admin dashboard
      setTimeout(() => {
        navigate(ROUTES.MOVIE);
      }, 500);
    } catch (error) {
      console.error(error);
      message.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra tài khoản/mật khẩu."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Tài khoản</label>
          <input
            type="text"
            name="taiKhoan"
            value={adminCredentials.taiKhoan}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            name="matKhau"
            value={adminCredentials.matKhau}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
