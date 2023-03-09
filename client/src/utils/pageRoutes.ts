import AlbumPage from "../pages/AlbumPage";
import GalleryPage from "./../pages/GalleryPage";
import HomePage from "./../pages/HomePage";
import MePage from "./../pages/MePage";
import NotFoundPage from "./../pages/NotFoundPage";
import UsersPage from "./../pages/UsersPage";
import { RoutePaths } from "./consts";
import UserPage from "../pages/UserPage";

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
    path: RoutePaths.ME,
    Component: MePage,
  },
  {
    path: RoutePaths.USER_GALLERY,
    Component: GalleryPage,
  },
  {
    path: RoutePaths.ME_GALLERY,
    Component: GalleryPage,
  },
  {
    path: RoutePaths.ME_GALLERY + "/:album_id",
    Component: AlbumPage,
  },
  {
    path: RoutePaths.ME_GALLERY + "/:album_id",
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
