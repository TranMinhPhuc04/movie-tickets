import api from "./apiService";
import API from "../constants/api";

const userService = {
  login: (userLogin) => {
    return api.post(API.GET_LOGIN, userLogin);
  },
  register: (userRegister) => {
    return api.post(API.POST_REGISTER, userRegister);
  },
  getProfile: () => {
    return api.post(
      API.GET_USER_INFO,
      {},
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8`,
        },
      }
    );
  },

  updateProfile: (userUpdate) => {
    return api.put(API.UPDATE_USER_INFO, userUpdate, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MiIsIkhldEhhblN0cmluZyI6IjIwLzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MzU5NjgwMDAwMCIsIm5iZiI6MTczNDI4NTYwMCwiZXhwIjoxNzYzNzQ4MDAwfQ.QbEZveH7dLuVnfzAyNgNtcIQzJu-95ShhXNZhmFB-H8`,
      },
    });
  },

  getUsers: () => api.get(API.GET_USER_LIST),

  // API tìm kiếm người dùng theo từ khóa
  searchUsers: (keyword) =>
    api.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`
    ),

  deleteUser: (taiKhoan) =>
    api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`),

  getRoles: () => api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"), // API lấy loại người dùng

  addUser: (userData) => api.post("/QuanLyNguoiDung/ThemNguoiDung", userData),

  updateUser: (userToUpdate) => {
    const token = localStorage.getItem("accessToken");

    return api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userService;
