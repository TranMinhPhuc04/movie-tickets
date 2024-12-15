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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWFmaWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtYWZpYUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsIm1hZmlhQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzM0MTUwMjQ2LCJleHAiOjE3MzQxNTM4NDZ9.Q9X1UduQTKVNqp2iaZBDXzK8vJnnyb0yVuEV1gB0ASQ`,
        },
      }
    );
  },

  updateProfile: (userUpdate) => {
    return api.put(API.UPDATE_USER_INFO, userUpdate, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWFmaWEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtYWZpYUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUXVhblRyaSIsIm1hZmlhQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzM0MTUwMjQ2LCJleHAiOjE3MzQxNTM4NDZ9.Q9X1UduQTKVNqp2iaZBDXzK8vJnnyb0yVuEV1gB0ASQ`,
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
        Authorization: `Bearer ${token}`, // Gửi token để backend xác thực
      },
    });
  },
};

export default userService;
