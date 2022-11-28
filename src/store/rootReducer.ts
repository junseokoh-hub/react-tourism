import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
