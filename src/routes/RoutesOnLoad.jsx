import axios from "axios";
import { useDispatch } from "react-redux";
import { allcategories } from "../features/Categories";
import { allcourses } from "../features/Courses";
import { alltestseries } from "../features/Testseries";
import moment from "moment";
import { REACT_APP_BACK_URL } from "../config/config";

export const fetchAndDispatchCategories = async () => {
  const dispatch = useDispatch();
  try {
    const response = await axios.get(
      `${REACT_APP_BACK_URL}/user/get-all-category`
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
    const response = await axios.get(
      `${REACT_APP_BACK_URL}/user/get-all-coursenames`
    );

    localStorage.setItem("courses", response.data.courses);
    dispatch(allcourses(response.data.courses));
  } catch (error) {
    console.log(error);
  }
};
export const fetchAndDispatchTestseriesnames = async () => {
  const dispatch = useDispatch();
  try {
    const response = await axios.get(
      `${REACT_APP_BACK_URL}/user/get-all-testseriesnames`
    );
    localStorage.setItem("testseries", response.data.courses);
    dispatch(alltestseries(response.data.testseries));
  } catch (error) {
    console.log(error);
  }
};
