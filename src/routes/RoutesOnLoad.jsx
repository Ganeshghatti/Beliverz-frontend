import axios from "axios";
import { useDispatch } from "react-redux";
import { allcategories } from "../features/Categories";
import { allcourses } from "../features/Courses";
import moment from "moment";

export const fetchAndDispatchCategories = async () => {
  const dispatch = useDispatch();
  try {
    const response = await axios.get(
      "https://beliverz-user-server.vercel.app/user/get-all-category"
    );
    localStorage.setItem("category", response.data.category);
    dispatch(allcategories(response.data.category));
  } catch (error) {
    console.log(error);
  }
};
export const fetchAndDispatchCoursenames = async () => {
  const dispatch = useDispatch();
  try {
    const lastModified = localStorage.getItem("lastModified");

    const headers = {};

    if (lastModified) {
      headers["If-Modified-Since"] = lastModified;
    }

    const response = await axios.get(
      "https://beliverz-user-server.vercel.app/user/get-all-coursenames",
      { headers }
    );

    if (response.status === 200) {
      const latestUpdatedAt = moment(response.headers["last-modified"]);
      localStorage.setItem("lastModified", latestUpdatedAt.toISOString());
      dispatch(allcourses(response.data.courses));
    }
  } catch (error) {
    console.log(error);
  }
};
