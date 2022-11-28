import { createSlice } from "@reduxjs/toolkit";

type InitialType = { isMenuOpen: boolean };

const initialState: InitialType = { isMenuOpen: false };

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    onOpen(state) {
      state.isMenuOpen = true;
    },
    onClose(state) {
      state.isMenuOpen = false;
    },
  },
});

export const { onOpen, onClose } = menuSlice.actions;

export default menuSlice.reducer;
