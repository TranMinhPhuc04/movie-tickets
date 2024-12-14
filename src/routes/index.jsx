import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
// import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMovie from "../pages/HomeTemplate/ListMoviePage";
import DetailMoviePage from "../pages/HomeTemplate/DetailMovePage";
import LoginPage from "../pages/HomeTemplate/AuthPage/LoginPage";
import RegisterPage from "../pages/HomeTemplate/AuthPage/RegisterPage";
import SeatPage from "../pages/HomeTemplate/SeatPage";
import ProfilePage from "../pages/HomeTemplate/AuthPage/ProfilePage";
import AdminTemplate from "../pages/AdminTemplate";
import FilmsPage from "../pages/AdminTemplate/FilmsPage";
import AddFilmPage from "../pages/AdminTemplate/AddFlimPage";
import EditFilmPage from "../pages/AdminTemplate/EditFlimPage";
import ShowtimePage from "../pages/AdminTemplate/ShowtimePage";
import AdminLoginPage from "../pages/AdminTemplate/AuthPage/AdminLoginPage";
import UserManagement from "../pages/AdminTemplate/AuthPage/UserManagement";
import PrivateRoute from "../contexts/PrivateRoute";
import { Route } from "react-router-dom";
import ROUTES from "../constants/routes";

const routes = [
  {
    path: "",
    element: <HomeTemplate />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.SEARCH,
        element: <ListMovie />,
      },
      {
        path: ROUTES.MOVIE_DETAIL,
        element: <DetailMoviePage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.LIST_SEAT,
        element: <SeatPage />,
      },
      {
        path: ROUTES.GET_USE_INFO,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    element: <AdminLoginPage />,
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminTemplate />
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTES.MOVIE,
        element: <FilmsPage />,
      },
      {
        path: ROUTES.ADD_MOVIE,
        element: <AddFilmPage />,
      },
      {
        path: `${ROUTES.EDIT_MOVIE}/:id`, // "/admin/flims/edit/:id"
        element: <EditFilmPage />,
      },
      {
        path: ROUTES.SHOWTIME,
        element: <ShowtimePage />,
      },
      {
        path: ROUTES.MANAGE_USER,
        element: <UserManagement />,
      },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
  });
};

export default renderRoutes;
