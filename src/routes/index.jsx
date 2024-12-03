import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMovie from "../pages/HomeTemplate/ListMoviePage";
import AdminTemplate from "../pages/AdminTemplate";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import DetailMoviePage from "../pages/HomeTemplate/DetailMovePage";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "about",
        element: AboutPage,
      },
      {
        path: "list-movie",
        element: ListMovie,
      },
      {
        path: "detail-movie/:id",
        element: DetailMoviePage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    children: [
      {
        path: "dashboard",
        element: DashboardPage,
      },
      {
        path: "add-user",
        element: AddUserPage,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
