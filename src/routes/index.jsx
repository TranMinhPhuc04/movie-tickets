import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
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
import UserManagement from "../pages/AdminTemplate/AuthPage/UserManagement";
import AddUser from "../pages/AdminTemplate/AuthPage/AddUser";
import EditUser from "../pages/AdminTemplate/AuthPage/EditUser";

import PrivateRoute from "../contexts/PrivateRoute";
import ROUTES from "../constants/routes";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: <HomeTemplate />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.SEARCH, element: <ListMovie /> },
      { path: ROUTES.MOVIE_DETAIL, element: <DetailMoviePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.LIST_SEAT, element: <SeatPage /> },
      { path: ROUTES.GET_USE_INFO, element: <ProfilePage /> },
    ],
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    element: <LoginPage />, // Gộp trang login cho cả admin và user
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["QuanTri"]}>
        <AdminTemplate />
      </PrivateRoute>
    ),
    children: [
      { path: ROUTES.MOVIE, element: <FilmsPage /> },
      { path: ROUTES.ADD_MOVIE, element: <AddFilmPage /> },
      {
        path: `${ROUTES.EDIT_MOVIE}/:id`,
        element: <EditFilmPage />,
      },
      { path: ROUTES.SHOWTIME, element: <ShowtimePage /> },
      { path: ROUTES.MANAGE_USER, element: <UserManagement /> },
      { path: ROUTES.ADD_USER, element: <AddUser /> },
      { path: ROUTES.EDIT_USER, element: <EditUser /> },
    ],
  },
];

// Render routes
const renderRoutes = () => {
  return routes.map((route, index) => {
    if (route.children) {
      return (
        <Route
          key={`parent-${index}`}
          path={route.path}
          element={route.element}
        >
          {route.children.map((item, childIndex) => (
            <Route
              key={`child-${index}-${childIndex}`}
              path={item.path}
              element={item.element}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route
          key={`route-${index}`}
          path={route.path}
          element={route.element}
        />
      );
    }
  });
};

export default renderRoutes;
