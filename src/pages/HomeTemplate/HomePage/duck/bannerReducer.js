import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/apiService";

// Thunk để lấy danh sách banners
export const fetchBanner = createAsyncThunk("banner/fetchBanner", async () => {
  try {
    const result = await api.get("QuanLyPhim/LayDanhSachBanner");
    return result.data.content; // Trả về danh sách banner
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể lấy danh sách banner"
    );
  }
});

const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    banners: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload; // Cập nhật state với dữ liệu banners
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Gán lỗi nếu có
      });
  },
});

export default bannerReducer.reducer;
