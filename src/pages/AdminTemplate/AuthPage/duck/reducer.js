import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/apiService";

export const actLogin = createAsyncThunk(
  "auth/admin/login",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyNguoiDung/DangNhap`, user);

      const userInfo = result.data.content;
      if (userInfo.maLoaiNguoiDung === "QuanTri") {
        // cho phép đi tiếp vào AdminTemplate

        // lưu thông tin user xuống localStorage
        localStorage.setItem("USER_ADMIN", JSON.stringify(userInfo));
      } else {
        // thông báo lỗi không cho phép vào AdminTemplate
        return rejectWithValue({
          data: {
            content: "Bạn không có quyền truy cập AdminTemplate",
          },
        });
      }

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const userInfo = localStorage.getItem("USER_ADMIN")
  ? JSON.parse(localStorage.getItem("USER_ADMIN"))
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
