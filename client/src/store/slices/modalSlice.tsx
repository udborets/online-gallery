import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPhotoActive: false,
  isAlbumActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isPhotoActive = action.payload.isPhotoActive;
      state.isAlbumActive = action.payload.isAlbumActive;
    },
  },
});

export default modalSlice.reducer;
export const { setIsActive } = modalSlice.actions;
