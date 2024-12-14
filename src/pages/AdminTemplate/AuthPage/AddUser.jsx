import React, { useEffect, useState, useContext } from "react";
import { Button, Input, Select, message } from "antd";
import userService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const { Option } = Select;

const AddUser = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  });

  const [roles, setRoles] = useState([]); // Danh sách loại người dùng
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, [role]);

  const fetchRoles = async () => {
    try {
      const res = await userService.getRoles();
      setRoles(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách loại người dùng:", err);
      message.error("Không thể lấy danh sách loại người dùng!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoleChange = (value) => {
    setForm({ ...form, maLoaiNguoiDung: value });
  };

  const handleSubmit = async () => {
    const { taiKhoan, matKhau, hoTen, email, soDt, maLoaiNguoiDung } = form;

    if (
      !taiKhoan ||
      !matKhau ||
      !hoTen ||
      !email ||
      !soDt ||
      !maLoaiNguoiDung
    ) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);

    try {
      await userService.addUser(form); // Gọi API thêm người dùng
      message.success("Thêm người dùng thành công!");
      navigate("/admin/users"); // Quay lại trang quản lý người dùng
    } catch (err) {
      console.error("Lỗi khi thêm người dùng:", err);
      message.error("Không thể thêm người dùng!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Thêm người dùng</h2>
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Tài khoản"
          name="taiKhoan"
          value={form.taiKhoan}
          onChange={handleInputChange}
        />
        <Input.Password
          placeholder="Mật khẩu"
          name="matKhau"
          value={form.matKhau}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Họ tên"
          name="hoTen"
          value={form.hoTen}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Số điện thoại"
          name="soDt"
          value={form.soDt}
          onChange={handleInputChange}
        />
        <Select
          placeholder="Chọn loại người dùng"
          value={form.maLoaiNguoiDung}
          onChange={handleRoleChange}
        >
          {roles.map((role) => (
            <Option key={role.maLoaiNguoiDung} value={role.maLoaiNguoiDung}>
              {role.tenLoai}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          loading={isLoading}
          onClick={handleSubmit}
          className="bg-blue-500 text-white"
        >
          Thêm người dùng
        </Button>
      </div>
    </div>
  );
};

export default AddUser;
