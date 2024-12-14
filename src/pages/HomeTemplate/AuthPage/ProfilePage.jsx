import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Input, Button, message, Tabs } from "antd";
import userService from "../../../services/userService";

const { TabPane } = Tabs;

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await userService.getProfile();
      setForm(res.data.content || {});
    } catch (err) {
      console.error("Lỗi khi tải thông tin tài khoản:", err);
      message.error("Không thể tải thông tin tài khoản!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await userService.updateProfile(form);
      message.success("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Cập nhật thông tin thất bại:", err.response || err);
      message.error("Không thể cập nhật thông tin!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Thông Tin Cá Nhân</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông Tin Cá Nhân" key="1">
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
          <Input
            placeholder="Họ tên"
            name="hoTen"
            value={form.hoTen}
            onChange={handleInputChange}
          />
          <Button
            type="primary"
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Cập nhật
          </Button>
        </TabPane>
        <TabPane tab="Role" key="2">
          <p>Role của bạn: {user?.maLoaiNguoiDung || "Không xác định"}</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
