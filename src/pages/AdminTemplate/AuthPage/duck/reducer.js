import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/apiService";

export const actLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyNguoiDung/DangNhap`, user);
      const userInfo = result.data.content;

      if (userInfo.maLoaiNguoiDung !== "QuanTri") {
        return rejectWithValue("Bạn không có quyền truy cập Admin!");
      }

      // Lưu vào localStorage
      localStorage.setItem("USER_ADMIN", JSON.stringify(userInfo));

      return userInfo;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại."
      );
    }
  }
);

const authAdminReducer = createSlice({
  name: "authReducer",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authAdminReducer.reducer;
