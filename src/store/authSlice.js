import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticaed: false,
  tokenID: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticaed = true;
      state.tokenID = action.payload.tokenID;
      state.userID = action.payload.userID;
    },
    logout: (state) => {
      state.isAuthenticaed = false;
      state.tokenID = null;
      state.userID = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;