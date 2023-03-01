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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserState(state, action) {
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
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
