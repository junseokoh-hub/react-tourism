import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import campingSlice from "./campingSlice";
import menuSlice from "./menuSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  menu: menuSlice,
  camping: campingSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
