import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  successMessage: null,
};

const addFilmSlice = createSlice({
  name: "addFilmSlice",
  initialState,
  reducers: {
    addFilmRequest(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    addFilmSuccess(state, action) {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    addFilmFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetState(state) {
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const { addFilmRequest, addFilmSuccess, addFilmFailure, resetState } =
  addFilmSlice.actions;

export default addFilmSlice.reducer;
