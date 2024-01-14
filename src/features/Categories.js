import { createSlice } from "@reduxjs/toolkit";

export const CategoriesSlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    allcategories: (state,action) => {
      state.categories = action.payload
    },
  },
});

export const { allcategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

