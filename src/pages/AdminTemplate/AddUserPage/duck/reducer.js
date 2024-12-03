import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/apiService";

export const actAddUser = createAsyncThunk(
  "admin/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(`QuanLyNguoiDung/ThemNguoiDung`, user);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const addUserReducer = createSlice({
  name: "addUserReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actAddUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(actAddUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(actAddUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addUserReducer.reducer;
