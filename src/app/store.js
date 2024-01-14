import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/User";
import { loadingSlice } from "../features/Loader";
import { CategoriesSlice } from "../features/Categories";
import { CourseSlice } from "../features/Courses";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
    category: CategoriesSlice.reducer,
    courses: CourseSlice.reducer,
  },
});
