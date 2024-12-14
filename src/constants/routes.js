const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  LOGIN: "/login",
  REGISTER: "/register",
  MOVIE_DETAIL: "/detail/:id",
  LIST_SEAT: "/booking/:maLichChieu",
  GET_USE_INFO: "/profile",
  // ADMIN
  ADMIN_LOGIN: "/admin/login",
  MOVIE: "/admin/flims",
  ADD_MOVIE: "/admin/flims/addnew",
  EDIT_MOVIE: "/admin/flims/edit",
  SHOWTIME: "/admin/flims/showtime/:idFilm",
  MANAGE_USER: "/admin/users",
};

export default ROUTES;
