import { createSlice } from "@reduxjs/toolkit";

import { NotificationTypes } from "../../utils/consts";

const initialState = {
  isActive: false,
  type: NotificationTypes.SUCCESS,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload.isActive;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
    },
    setType: (state, action) => {
      state.type = action.payload.type;
    },
  },
});

export const { reducer: notificationReducer, actions: notificationActions } =
  notificationSlice;
