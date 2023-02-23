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
    createUser(state, action) {
      state.userInfo = action.payload.userInfo;
    },
    deleteUser(state) {
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
export const { deleteUser, createUser } = userSlice.actions;
