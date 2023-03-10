import GalleryPage from "./../pages/GalleryPage";
import HomePage from "./../pages/HomePage";
import NotFoundPage from "./../pages/NotFoundPage";
import UsersPage from "./../pages/UsersPage";
import UserPage from "../pages/UserPage";
import { RoutePaths } from "./consts";
import AlbumPage from "../pages/AlbumPage";

export const authRoutes = [
  {
    path: RoutePaths.USERS,
    Component: UsersPage,
  },
  {
    path: RoutePaths.USER,
    Component: UserPage,
  },
  {
    path: RoutePaths.USER_GALLERY,
    Component: GalleryPage,
  },
  {
    path: RoutePaths.USER_ALBUM,
    Component: AlbumPage,
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
