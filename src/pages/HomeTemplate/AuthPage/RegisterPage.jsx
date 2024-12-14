import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../../services/userService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP01", // Mặc định nhóm là GP01
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (form.matKhau !== form.nhapLaiMatKhau) {
      message.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    const { nhapLaiMatKhau, ...payload } = form; // Loại bỏ nhapLaiMatKhau trước khi gửi lên server

    try {
      await userService.register(payload);
      message.success("Đăng ký thành công!");
      navigate("/dangnhap"); // Điều hướng sang trang đăng nhập
    } catch (err) {
      console.error("Đăng ký thất bại:", err.response || err);
      const errorMsg =
        err.response?.data?.content || "Đăng ký thất bại. Vui lòng thử lại!";
      message.error(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>
        <form>
          <div className="mb-4">
            <Input
              placeholder="Tài khoản"
              name="taiKhoan"
              value={form.taiKhoan}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input.Password
              placeholder="Mật khẩu"
              name="matKhau"
              value={form.matKhau}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input.Password
              placeholder="Nhập lại mật khẩu"
              name="nhapLaiMatKhau"
              value={form.nhapLaiMatKhau}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Họ tên"
              name="hoTen"
              value={form.hoTen}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Số điện thoại"
              name="soDt"
              value={form.soDt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <Button type="primary" onClick={handleSubmit}>
              Đăng ký
            </Button>
            <Link to="/login">
              <Button>Đăng nhập ➡</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
