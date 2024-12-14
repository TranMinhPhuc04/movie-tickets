import React, { useEffect, useState } from "react";
import { Input, Button, message, Tabs } from "antd";
import userService from "../../../services/userService";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await userService.getProfile();
      setUserInfo(res.data.content || {});
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
      setIsLoading(true);
      await userService.updateProfile(form);
      message.success("Cập nhật thông tin thành công!");
      fetchProfile();
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err.response || err);
      const errorMsg =
        err.response?.data?.content || "Cập nhật thất bại. Vui lòng thử lại!";
      message.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Chuyển đổi cấu trúc TabPane sang items
  const tabItems = [
    {
      label: "Thông Tin Cá Nhân", // Tên Tab
      key: "1", // Key của Tab
      // Nội dung của Tab
      children: (
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
            loading={isLoading}
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
    {
      label: "Lịch Sử Đặt Vé",
      key: "2",
      children: (
        <div>
          <h3 className="text-xl font-bold mb-4">Lịch Sử Đặt Vé</h3>
          {userInfo.thongTinDatVe ? (
            userInfo.thongTinDatVe.map((ticket, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h4 className="text-lg font-bold">{ticket.tenPhim}</h4>
                <p>Ngày đặt: {ticket.ngayDat}</p>
                <p>
                  Rạp: {ticket.tenCumRap} - Ghế:{" "}
                  {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p>Không có lịch sử đặt vé.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Thông Tin Cá Nhân</h2>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default ProfilePage;
