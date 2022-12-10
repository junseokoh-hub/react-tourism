import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialType = { isDark: boolean };

const initialState: InitialType = { isDark: false };

const darkSlice = createSlice({
  name: "dark",
  initialState,
  reducers: {
    setDark(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
    },
  },
});

export const { setDark } = darkSlice.actions;

export default darkSlice.reducer;
