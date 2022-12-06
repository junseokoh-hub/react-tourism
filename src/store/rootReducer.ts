import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import campingSlice from "./slices/campingSlice";
import menuSlice from "./slices/menuSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
  camping: campingSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
