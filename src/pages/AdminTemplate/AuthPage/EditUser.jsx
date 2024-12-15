import React, { useContext, useState, useEffect } from "react";
import { Button, Input, Select, message } from "antd";
import userService from "../../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const { Option } = Select;

const EditUser = () => {
  const { role } = useContext(AuthContext); // Lấy role từ AuthContext
  const location = useLocation();
  const navigate = useNavigate();
  const userToEdit = location.state?.user; // Lấy dữ liệu người dùng từ state
  const [form, setForm] = useState(userToEdit || {});

  useEffect(() => {
    // Nếu không có role hoặc role không phải QuanTri, chặn truy cập
    if (role !== "QuanTri") {
      message.error("Bạn không có quyền cập nhật người dùng!");
      navigate("/admin/users"); // Điều hướng về trang quản lý người dùng
    }
  }, [role, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Gọi API cập nhật thông tin người dùng
      await userService.updateUser({
        taiKhoan: form.taiKhoan,
        matKhau: form.matKhau,
        hoTen: form.hoTen,
        email: form.email,
        soDt: form.soDt,
        maLoaiNguoiDung: form.maLoaiNguoiDung,
        maNhom: "GP01",
      });

      message.success("Cập nhật người dùng thành công!");
      navigate("/admin/users"); // Quay lại trang quản lý người dùng
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      const errorMsg =
        err.response?.data?.message || "Không thể cập nhật người dùng!";
      message.error(errorMsg);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa người dùng</h2>
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Tài khoản"
          name="taiKhoan"
          value={form.taiKhoan}
          onChange={handleInputChange}
          disabled
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
          onChange={(value) => setForm({ ...form, maLoaiNguoiDung: value })}
        >
          <Option value="KhachHang">Khách Hàng</Option>
          <Option value="QuanTri">Quản Trị</Option>
        </Select>
        <Button type="primary" onClick={handleSubmit}>
          Cập nhật người dùng
        </Button>
      </div>
    </div>
  );
};

export default EditUser;
