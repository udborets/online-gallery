import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { notificationReducer } from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    notification: notificationReducer,
  },
});
