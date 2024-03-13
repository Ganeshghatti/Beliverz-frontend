import { createSlice } from "@reduxjs/toolkit";

export const TestseriesSlice = createSlice({
  name: "testseries",
  initialState: {
    testseries: [],
  },
  reducers: {
    alltestseries: (state,action) => {
      state.testseries = action.payload
    },
  },
});

export const { alltestseries } = TestseriesSlice.actions;

export default TestseriesSlice.reducer;

