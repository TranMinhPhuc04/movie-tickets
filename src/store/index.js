import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "../pages/HomeTemplate/HomePage/duck/reducer";
import bannerReducer from "../pages/HomeTemplate/HomePage/duck/bannerReducer";
import authReducer from "../pages/HomeTemplate/AuthPage/duck/reducer";
import bookingTicketReducer from "../pages/HomeTemplate/SeatPage/duck/reducer";
import addFilmSlice from "../pages/AdminTemplate/AddFlimPage/duck/reducer";
// import seatReducer from "../pages/HomeTemplate/SeatPage/duck/reducer";
// Config Redux store
const store = configureStore({
  reducer: {
    listMovieReducer,
    bannerReducer,
    authReducer,
    bookingTicketReducer,
    addFilmSlice,
  },
});

export default store;
