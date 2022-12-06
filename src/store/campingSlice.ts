import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationBasedListType } from "../api/campingApi";

type InitialType = {
  camping: LocationBasedListType[];
  marks: { title: string; latlng: any }[];
};

const initialState: InitialType = { camping: [], marks: [] };

const campingSlice = createSlice({
  name: "camping",
  initialState,
  reducers: {
    onGetData(state, action: PayloadAction<LocationBasedListType[]>) {
      state.camping = action.payload;
    },
    onMarks(state, action) {
      state.marks = action.payload;
    },
  },
});

export const { onGetData } = campingSlice.actions;

export default campingSlice.reducer;
