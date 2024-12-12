import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listSeat: null,
  listSeatSelected: [],
};

const bookingTicketReducer = createSlice({
  name: "bookingTicketReducer",
  initialState,
  reducers: {
    setBookingSeat: (state, action) => {
      console.log(action);
      const { payload } = action;

      // tìm vị trí ghế trong mảng listSeatSelected
      const index = state.listSeatSelected.findIndex(
        (seat) => seat.soGhe === payload.soGhe
      );
      if (index !== -1) {
        // xóa ghế khỏi mảng
        state.listSeatSelected.splice(index, 1);
      } else {
        // thêm ghế vào mảng
        state.listSeatSelected.push(payload);
      }
    },
  },
});

export const { setBookingSeat } = bookingTicketReducer.actions;

export default bookingTicketReducer.reducer;
