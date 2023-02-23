import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: null,
    name: null,
    email: null,
    avatar: null,
    role: null,
    albums: null,
    photos: null,
    createdAt: null,
    updatedAt: null,
  },
  isAuth: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserState(state, action) {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    deleteUserState(state) {
      state.userInfo = {
        id: null,
        name: null,
        email: null,
        avatar: null,
        role: null,
        albums: null,
        photos: null,
        createdAt: null,
        updatedAt: null,
      };
      state.isAuth = false;
      state.token = null;
    },
  },
});

export default userSlice.reducer;
export const { deleteUserState, updateUserState } = userSlice.actions;
