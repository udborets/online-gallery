import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  email: "",
  name: "",
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
    deleteUserState(state) {
      state.isAuth = false;
      state.email = "";
      state.name = "";
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
