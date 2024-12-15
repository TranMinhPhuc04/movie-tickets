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

  const tabItems = [
    {
      label: "Thông Tin Cá Nhân",
      key: "1",
      children: (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <div className="md:col-span-2">
            <Button
              type="primary"
              loading={isLoading}
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              Cập nhật
            </Button>
          </div>
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
              <div
                key={index}
                className="mb-4 p-4 border rounded shadow-sm bg-gray-50"
              >
                <h4 className="text-lg font-bold text-blue-600">
                  {ticket.tenPhim}
                </h4>
                <p className="text-gray-700">Ngày đặt: {ticket.ngayDat}</p>
                <p className="text-gray-700">
                  Rạp: {ticket.tenCumRap} - Ghế:{" "}
                  {ticket.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có lịch sử đặt vé.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-[70px] min-h-screen p-6 bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Thông Tin Cá Nhân
        </h2>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </div>
  );
};

export default ProfilePage;
