const ROUTES = {
  // Home routes
  HOME: "/",
  SEARCH: "/search",
  LOGIN: "/login",
  REGISTER: "/register",
  MOVIE_DETAIL: "/detail/:id",
  LIST_SEAT: "/booking/:maLichChieu",
  GET_USE_INFO: "/profile",

  // Admin routes
  MOVIE: "/admin/films",
  ADD_MOVIE: "/admin/films/addnew",
  EDIT_MOVIE: "/admin/films/edit",
  SHOWTIME: "/admin/films/showtime/:idFilm",
  MANAGE_USER: "/admin/users",
  ADD_USER: "/admin/users/add",
  EDIT_USER: "/admin/users/edit/:taiKhoan",
};

export default ROUTES;
