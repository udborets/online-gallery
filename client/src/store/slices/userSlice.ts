import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  email: "",
  name: "",
  avatar: "",
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
    setUserName(state, action) {
      state.name = action.payload.name;
    },
    setUserAvatar(state, action) {
      state.avatar = action.payload.avatar;
    },
    deleteUserState(state) {
      state.isAuth = false;
      state.email = "";
      state.name = "";
      state.avatar = "";
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
