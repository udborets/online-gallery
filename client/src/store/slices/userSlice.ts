import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.email = action.payload.email;
    },
    setUserIsAuth(state, action) {
      state.isAuth = action.payload.isAuth;
    },
    deleteUserState(state) {
      state.email = "";
      state.isAuth = false;
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
