import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import userService from "../../../services/userService";
import { message, Table, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

const UserManagement = () => {
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user && role !== "QuanTri") {
    return (
      <p className="text-red-500">Bạn không có quyền truy cập trang này!</p>
    );
  }

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch toàn bộ danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await userService.getUsers();
      setUsers(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      message.error("Không thể tải danh sách người dùng!");
    }
  };

  // Tìm kiếm người dùng
  const searchUsers = async (keyword) => {
    try {
      const res = await userService.searchUsers(keyword);
      setUsers(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm người dùng:", err);
      message.error("Không thể tìm kiếm người dùng!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      searchUsers(search.trim()); // Nếu có từ khóa, gọi API tìm kiếm
    } else {
      fetchUsers(); // Nếu không có từ khóa, tải toàn bộ danh sách
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Gọi hàm tìm kiếm khi nhấn Enter
    }
  };

  const handleEditUser = (user) => {
    navigate(ROUTES.EDIT_USER.replace(":taiKhoan", user.taiKhoan), {
      state: { user },
    });
  };

  const handleAddUser = () => {
    navigate(ROUTES.ADD_USER);
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý người dùng</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Nhập vào tài khoản hoặc họ tên"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
            style={{ width: "300px" }}
          />
          <Button type="primary" onClick={handleSearch}>
            Tìm
          </Button>
          <Button
            type="primary"
            onClick={handleAddUser}
            className="bg-green-500"
          >
            Thêm người dùng
          </Button>
        </div>
      </div>
      <Table
        dataSource={users}
        columns={[
          { title: "STT", render: (_, __, index) => index + 1, key: "index" },
          { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
          { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Số điện thoại", dataIndex: "soDt", key: "soDt" },
          {
            title: "Hành động",
            render: (text, record) => (
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEditUser(record)}
                  type="primary"
                  className="bg-blue-500"
                >
                  Sửa
                </Button>
                <Button
                  danger
                  onClick={() => handleDeleteUser(record.taiKhoan)}
                >
                  Xóa
                </Button>
              </div>
            ),
            key: "actions",
          },
        ]}
        rowKey="taiKhoan"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserManagement;
