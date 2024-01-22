import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Instructors from "./pages/Instructors/Instructors";
import {
  fetchAndDispatchCategories,
  fetchAndDispatchCoursenames,
} from "./routes/RoutesOnLoad";
import { useDispatch } from "react-redux";
import { saveuser } from "./features/User";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsandConditions from "./Components/TermsandConditions";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import CoursePage from "./pages/CoursePage/CoursePage";
import Account from "./pages/Account/Account";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserDataJSON = localStorage.getItem("user");
    if (storedUserDataJSON) {
      const storedUserData = JSON.parse(storedUserDataJSON);
      dispatch(
        saveuser({
          email: storedUserData.email,
          token: storedUserData.token,
          username: storedUserData.username,
        })
      );
    }
  }, []);
  fetchAndDispatchCategories();
  fetchAndDispatchCoursenames();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/account" element={<Account />} />
          <Route path="/courses/:courseId" element={<CourseDescription />} />
          <Route
            path="/courses/:courseId/:email/:chapterId/:contentId"
            element={<CoursePage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsandConditions />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
