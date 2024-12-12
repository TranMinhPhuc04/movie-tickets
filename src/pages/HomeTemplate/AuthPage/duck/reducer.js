import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/apiService";

export const actLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyNguoiDung/DangNhap`, user);

      const userInfo = result.data.content;

      // Phân loại người dùng dựa trên maLoaiNguoiDung
      if (userInfo.maLoaiNguoiDung === "KhachHang") {
        // Lưu thông tin khách hàng vào localStorage
        localStorage.setItem("USER_CUSTOMER", JSON.stringify(userInfo));
        return userInfo;
      } else {
        return rejectWithValue({
          data: {
            content: "Bạn không có quyền truy cập trang này!",
          },
        });
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const userInfo = localStorage.getItem("USER_CUSTOMER")
  ? JSON.parse(localStorage.getItem("USER_CUSTOMER"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authReducer.reducer;
