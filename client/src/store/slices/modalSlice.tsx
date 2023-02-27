import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalElement: <div></div>
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.modalElement = action.payload.modalElement;
    },
  },
});

export default modalSlice.reducer;
export const { setModalState } = modalSlice.actions;
