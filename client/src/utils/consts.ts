enum RoutePaths {
  HOME = "/",
  USERS = "/users",
  USER = "/users/:user_id",
  USER_GALLERY = "users/:user_id/gallery",
  USER_ALBUM = "users/:user_id/:gallery/:album_name",
  GALLERY = "/gallery",
  NOTFOUND = "/notfound",
}

enum NotificationTypes {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export { RoutePaths, NotificationTypes };
