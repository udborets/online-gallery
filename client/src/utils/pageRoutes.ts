import { RoutePaths } from "./consts";
import HomePage from "./../pages/HomePage";
import MePage from "./../pages/MePage";
import UsersPage from "./../pages/UsersPage";
import NotFoundPage from "./../pages/NotFoundPage";

export const authRoutes = [
  {
    path: RoutePaths.HOME,
    Component: HomePage,
  },
  {
    path: RoutePaths.ME,
    Component: MePage,
  },
  {
    path: RoutePaths.USERS + "/:id",
    Component: UsersPage,
  },
  {
    path: RoutePaths.USERS,
    Component: UsersPage,
  },
];

export const publicRoutes = [
  {
    path: RoutePaths.HOME,
    Component: HomePage,
  },
  {
    path: RoutePaths.NOTFOUND,
    Component: NotFoundPage,
  },
];
