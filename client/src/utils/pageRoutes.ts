import AlbumPage from "../pages/AlbumPage";
import GalleryPage from "./../pages/GalleryPage";
import HomePage from "./../pages/HomePage";
import MePage from "./../pages/MePage";
import NotFoundPage from "./../pages/NotFoundPage";
import UsersPage from "./../pages/UsersPage";
import { RoutePaths } from "./consts";

export const authRoutes = [
  {
    path: RoutePaths.USERS,
    Component: UsersPage,
  },
  {
    path: RoutePaths.USERS + "/:user_email",
    Component: UsersPage,
  },
  {
    path: RoutePaths.USERS + "/:user_email" + RoutePaths.GALLERY + "/:album_id",
    Component: AlbumPage,
  },
  {
    path:
      RoutePaths.USERS +
      "/:user_email" +
      RoutePaths.GALLERY +
      "/:album_id" +
      "/:photo_id",
    Component: AlbumPage,
  },
  {
    path: RoutePaths.ME,
    Component: MePage,
  },
  {
    path: RoutePaths.ME + RoutePaths.GALLERY,
    Component: GalleryPage,
  },
  {
    path: RoutePaths.ME + RoutePaths.GALLERY + "/:album_id",
    Component: GalleryPage,
  },
  {
    path: RoutePaths.ME + RoutePaths.GALLERY + "/:album_id" + "/:photo_id",
    Component: GalleryPage,
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
