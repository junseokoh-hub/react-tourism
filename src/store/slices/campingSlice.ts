import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationBasedListType } from "../../api/campingApi";

type InitialType = {
  camping: LocationBasedListType[];
};

const initialState: InitialType = { camping: [] };

const campingSlice = createSlice({
  name: "camping",
  initialState,
  reducers: {
    onGetData(state, action: PayloadAction<LocationBasedListType[]>) {
      state.camping = action.payload;
    },
  },
});

export const { onGetData } = campingSlice.actions;

export default campingSlice.reducer;
