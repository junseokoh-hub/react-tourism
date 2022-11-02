import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { user: null, isAuthReady: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action: PayloadAction<any>) {
      state = { ...state, user: action.payload };
    },
    onLogout(state) {
      state = { ...state, user: null };
    },
    onState(state, action: PayloadAction<any>) {
      state = { ...state, user: action.payload, isAuthReady: true };
    },
  },
});

export const { onLogin, onLogout, onState } = authSlice.actions;

export default authSlice.reducer;
