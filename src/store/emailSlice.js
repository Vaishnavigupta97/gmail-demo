import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: null,
  unreadMails: [],
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.emails = action.payload;
      state.unreadMails = action.payload.unreadMails;
    },
  },
});

export const { addData } = emailSlice.actions;

export default emailSlice.reducer;
