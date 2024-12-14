import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import userService from "../../../services/userService";
import { message, Table, Button, Input } from "antd";

const UserManagement = () => {
  const { user, role } = useContext(AuthContext); // Lấy role từ AuthContext
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role !== "QuanTri") {
      message.error("Bạn không có quyền truy cập trang này!");
      return;
    }
    fetchUsers();
  }, [role]);

  const fetchUsers = async () => {
    try {
      const res = await userService.getUserList(search);
      setUsers(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      message.error("Không thể tải danh sách người dùng!");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchUsers();
  };

  const handleDeleteUser = async (taiKhoan) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await userService.deleteUser(taiKhoan);
        message.success("Xóa người dùng thành công!");
        fetchUsers(); // Cập nhật danh sách sau khi xóa
      } catch (err) {
        console.error("Xóa người dùng thất bại:", err);
        message.error("Không thể xóa người dùng!");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {role === "QuanTri" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Quản lý người dùng
            </h2>
            <Input.Search
              placeholder="Tìm kiếm người dùng"
              value={search}
              onChange={handleSearch}
              onSearch={handleSearchSubmit}
              className="w-1/3"
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
                  <Button
                    danger
                    onClick={() => handleDeleteUser(record.taiKhoan)}
                  >
                    Xóa
                  </Button>
                ),
              },
            ]}
          />
        </>
      ) : (
        <p className="text-red-500">Bạn không có quyền truy cập trang này!</p>
      )}
    </div>
  );
};

export default UserManagement;
