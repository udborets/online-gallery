import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload.isActive;
    },
  },
});

export default modalSlice.reducer;
export const { setIsActive } = modalSlice.actions;
