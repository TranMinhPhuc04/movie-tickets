import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "../pages/HomeTemplate/ListMoviePage/duck/reducer";
import detailMovieReducer from "../pages/HomeTemplate/DetailMovePage/duck/reducer";
import authReducer from "../pages/AdminTemplate/AuthPage/duck/reducer";
import addUserReducer from "../pages/AdminTemplate/AddUserPage/duck/reducer";

const store = configureStore({
  reducer: {
    listMovieReducer, // listMovieReducer: listMovieReducer
    detailMovieReducer, // detailMovieReducer: detailMovieReducer
    authReducer, // authReducer: authReducer
    addUserReducer, // addUserReducer: addUserReducer
  },
});

export default store;
