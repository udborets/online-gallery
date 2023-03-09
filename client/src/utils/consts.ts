enum RoutePaths {
  HOME = "/",
  USERS = "/users",
  USER = "/users/:user_name",
  USER_GALLERY = "users/:user_name/gallery",
  GALLERY = "/gallery",
  NOTFOUND = "/notfound",
}

enum NotificationTypes {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export { RoutePaths, NotificationTypes };
