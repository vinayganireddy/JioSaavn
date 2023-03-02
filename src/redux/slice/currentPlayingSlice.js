import { createSlice } from "@reduxjs/toolkit";

const currentPlayingSlice = createSlice({
  name: "Current Playing",
  initialState: {
    value: {},
  },
  reducers: {
    selectCurrent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectCurrent } = currentPlayingSlice.actions;
export default currentPlayingSlice;
