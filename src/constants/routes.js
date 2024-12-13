const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  LOGIN: "/login",
  REGISTER: "/register",
  MOVIE_DETAIL: "/detail/:id",
  LIST_SEAT: "/booking/:maLichChieu",

  // ADMIN
  ADMIN_LOGIN: "/admin/login",
  MOVIE: "/admin/flims", // Trang danh sách phim
  ADD_MOVIE: "/admin/flims/addnew", // Trang thêm phim
  EDIT_MOVIE: "/admin/flims/edit", // Trang sửa phim
};

export default ROUTES;
