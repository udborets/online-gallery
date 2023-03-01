import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload.isActive;
    },
  },
});

export const { reducer: notificationReducer, actions: notificationActions } = notificationSlice;
