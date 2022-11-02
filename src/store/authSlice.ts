import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type InitialType = {
  user: User | null;
  isAuthReady: boolean;
};

const initialState: InitialType = { user: null, isAuthReady: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action: PayloadAction<User | null>) {
      return { ...state, user: action.payload };
    },
    onLogout(state) {
      return { ...state, user: null };
    },
    onState(state, action: PayloadAction<User | null>) {
      return { ...state, user: action.payload, isAuthReady: true };
    },
  },
});

export const { onLogin, onLogout, onState } = authSlice.actions;

export default authSlice.reducer;
