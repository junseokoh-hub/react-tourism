import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import campingSlice from "./slices/campingSlice";
import darkSlice from "./slices/darkSlice";
import menuSlice from "./slices/menuSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
  camping: campingSlice,
  dark: darkSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
