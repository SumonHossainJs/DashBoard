import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie"; 
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const cookies = new Cookies();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    checkAccessTokenCookie: (state) => {
      const accessToken = cookies.get("accessToken");

      if (!accessToken) {
        state.currentUser = null;
      }
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  checkAccessTokenCookie,
} = userSlice.actions;

export default userSlice.reducer;
