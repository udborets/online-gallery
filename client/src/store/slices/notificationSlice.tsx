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

export default notificationSlice.reducer;
export const { setIsActive } = notificationSlice.actions;
