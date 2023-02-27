import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationElement: <div></div>
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationState: (state, action) => {
      state.notificationElement = action.payload.notificationElement;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotificationState } = notificationSlice.actions;
