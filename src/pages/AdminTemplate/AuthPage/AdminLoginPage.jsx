import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actLogin } from "../../AdminTemplate/AuthPage/duck/reducer";
import ROUTES from "../../../constants/routes";
import { message } from "antd";

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.authAdminReducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actLogin(credentials))
      .unwrap()
      .then(() => {
        message.success("Đăng nhập thành công!");
        navigate(ROUTES.MOVIE);
      })
      .catch((err) => {
        message.error(err || "Đăng nhập thất bại!");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Tài khoản</label>
          <input
            type="text"
            name="taiKhoan"
            value={credentials.taiKhoan}
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
            value={credentials.matKhau}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
