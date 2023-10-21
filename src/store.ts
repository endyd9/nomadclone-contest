import { configureStore, createSlice } from "@reduxjs/toolkit";

export const peedSlice = createSlice({
  name: "peed",
  initialState: {
    value: {
      isFollow: false,
    },
  },
  reducers: {
    change: (state) => {
      state.value.isFollow = !state.value.isFollow;
    },
  },
});

export const store = configureStore({
  reducer: {
    peed: peedSlice.reducer,
  },
});
