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
      navigate("/login"); // Điều hướng sang trang đăng nhập
    } catch (err) {
      console.error("Đăng ký thất bại:", err.response || err);
      const errorMsg =
        err.response?.data?.content || "Đăng ký thất bại. Vui lòng thử lại!";
      message.error(errorMsg);
    }
  };

  return (
    <div className="mt-[70px] min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Đăng Ký
        </h2>
        <form>
          <div className="mb-4">
            <Input
              placeholder="Tài khoản"
              name="taiKhoan"
              value={form.taiKhoan}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Input.Password
              placeholder="Mật khẩu"
              name="matKhau"
              value={form.matKhau}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Input.Password
              placeholder="Nhập lại mật khẩu"
              name="nhapLaiMatKhau"
              value={form.nhapLaiMatKhau}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Họ tên"
              name="hoTen"
              value={form.hoTen}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="mb-4">
            <Input
              placeholder="Số điện thoại"
              name="soDt"
              value={form.soDt}
              onChange={handleInputChange}
              required
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Button
              type="primary"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Đăng ký
            </Button>
            <Link to="/login">
              <Button className="w-full sm:w-auto">Đăng nhập ➡</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
