import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null,
  user: {
    id: null,
    name: "",
    email: "",
    phone: "",
    lastLogin: null,
  },
  isAuthenticated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    guestLogin: (state) => {
      state.token = null;
      state.user = {
        id: "guest",
        name: "Guest User",
        email: "guest@example.com",
        phone: "",
        lastLogin: new Date().toISOString(),
      };
      state.isAuthenticated = true;
      state.isGuest = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = {
        id: null,
        name: "",
        email: "",
        phone: "",
        lastLogin: null,
      };
      state.isAuthenticated = false;
      state.isGuest = false;
    },
  },
});

export const { loginSuccess, logout, guestLogin } = authSlice.actions;
export default authSlice.reducer;
