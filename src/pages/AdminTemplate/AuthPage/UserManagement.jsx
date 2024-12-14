import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import userService from "../../../services/userService";
import { message, Table, Button, Input } from "antd";

const UserManagement = () => {
  const { role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role !== "QuanTri") {
      message.error("Bạn không có quyền truy cập trang này!");
      return;
    }
    fetchUsers();
  }, [role]);
  console.log(role);

  const fetchUsers = async () => {
    try {
      const res = await userService.getUsers(search);
      setUsers(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      message.error("Không thể tải danh sách người dùng!");
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    fetchUsers();
  };

  const handleDeleteUser = async (taiKhoan) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await userService.deleteUser(taiKhoan);
        message.success("Xóa người dùng thành công!");
        fetchUsers();
      } catch (err) {
        console.error("Xóa người dùng thất bại:", err);
        message.error("Không thể xóa người dùng!");
      }
    }
  };

  return role === "QuanTri" ? (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý người dùng</h2>
        <Input.Search
          placeholder="Tìm kiếm người dùng"
          onSearch={handleSearch}
          style={{ width: "300px" }}
        />
      </div>
      <Table
        dataSource={users}
        columns={[
          { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
          { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Số điện thoại", dataIndex: "soDt", key: "soDt" },
          {
            title: "Hành động",
            render: (text, record) => (
              <Button danger onClick={() => handleDeleteUser(record.taiKhoan)}>
                Xóa
              </Button>
            ),
          },
        ]}
      />
    </div>
  ) : (
    <p className="text-red-500">Bạn không có quyền truy cập trang này!</p>
  );
};

export default UserManagement;
