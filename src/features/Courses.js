import { createSlice } from "@reduxjs/toolkit";

export const CourseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
  },
  reducers: {
    allcourses: (state,action) => {
      state.courses = action.payload
    },
  },
});

export const { allcourses } = CourseSlice.actions;

export default CourseSlice.reducer;

