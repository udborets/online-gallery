import { RoutePaths } from "./consts";
import HomePage from "./../pages/HomePage";
import MePage from "./../pages/MePage";
import UsersPage from "./../pages/UsersPage";
import NotFoundPage from "./../pages/NotFoundPage";
import GalleryPage from "./../pages/GalleryPage";
import AlbumPage from "../pages/AlbumPage";

export const authRoutes = [
  {
    path: RoutePaths.USERS,
    Component: UsersPage,
  },
  {
    path: RoutePaths.USERS + "/:id",
    Component: UsersPage,
  },
  {
    path: RoutePaths.USERS + "/:user_id" + RoutePaths.GALLERY + "/:album_id",
    Component: AlbumPage,
  },
  {
    path:
      RoutePaths.USERS +
      "/:user_id" +
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
