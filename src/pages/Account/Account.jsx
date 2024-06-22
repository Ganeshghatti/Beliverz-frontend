import React, { useState, useEffect } from "react";
import "./Account.scss";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import imgplaceholder from "./imgplaceholder.png";
import { Link, useNavigate } from "react-router-dom";
import Spinnerf from "../../Components/Spinnerf";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import emptycart from "./emptycart.jpeg";
import { REACT_APP_BACK_URL } from "../../config/config";

export default function Account() {
  const user = useSelector((state) => state.user.user);
  const [enrolledcourses, setenrolledcourses] = useState();
  const [enrolledtestseries, setenrolledtestseries] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token.length > 1) {
          setLoading(true);
          const response = await axios.get(
            `${REACT_APP_BACK_URL}/user/account/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setenrolledcourses(response.data.userDetails.coursesEnrolled);
          setenrolledtestseries(response.data.userDetails.testseriesEnrolled);
          setLoading(false);
        }
      } catch (error) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            {error.response.data.error}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const viewallcoursesf = () => {
    navigate("/#courses");
  };
  const viewalltestseriesf = () => {
    navigate("/#testseries");
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinnerf />
      ) : (
        <>
          <section
            id="account"
            className="w-full flex-col flex items-center  py-20"
          >
            <Stack spacing={2}>{alert}</Stack>
            {user.username && (
              <div className="account-intro w-full flex justify-center">
                <p className="w-3/5 md:w-11/12 font-semibold text-black2 text-2xl md:text-xl text-center py-16 ">
                  Hi {user.username}
                </p>
              </div>
            )}{" "}
            <div className="flex flex-col justify-center w-full items-center py-16">
              <div className="w-3/4 flex flex-col gap-6 md:w-11/12">
                {enrolledcourses && enrolledcourses.length > 0 && (
                  <p
                    className="text-3xl md:text-2xl font-medium text-blue md:text-center"
                    style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
                  >
                    Courses
                  </p>
                )}
                <div className="flex gap-8 md:flex-col flex-wrap">
                  {enrolledcourses && enrolledcourses.length > 0 ? (
                    <>
                      {enrolledcourses.map((item, index) => (
                        <Link
                          to={`/courses/${item.currentlywatching.courseId}/${user.email}/${item.currentlywatching.chapterId}/${item.currentlywatching.contentId}`}
                          key={item.courseId}
                        >
                          <div className="cursor-pointer relative account-courses-card gap-1 rounded-xl flex flex-col items-center">
                            <img
                              src={item.thumbnail || imgplaceholder}
                              className="h-72 w-full object-cover rounded-xl"
                            />

                            <p className="w-11/12 font-medium text-black1 text-xl py-4">
                              {item.courseName}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {enrolledcourses && enrolledcourses.length == 0 && (
                        <section className="w-screen flex flex-col gap-4 items-center justify-center">
                          <img
                            src={emptycart}
                            alt="no courses enrolled"
                            className="w-1/4 md:w-1/2"
                          />
                          <p className="text-4xl md:text-3xl font-semibold">
                            No courses Enrolled
                          </p>
                          <p className="text-lg md:text-base font-normal">
                            Enroll courses to watch here
                          </p>
                          <button
                            className="rounded-xl bg-blue text-white py-2 px-4"
                            onClick={viewallcoursesf}
                          >
                            View All Courses
                          </button>
                        </section>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="w-3/4 flex flex-col gap-6 md:w-11/12">
                {enrolledtestseries && enrolledtestseries.length > 0 && (
                  <p
                    className="text-3xl md:text-2xl font-medium text-blue md:text-center"
                    style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
                  >
                    Testseries
                  </p>
                )}
                <div className="flex gap-8 md:flex-col flex-wrap">
                  {enrolledtestseries && enrolledtestseries.length > 0 ? (
                    <>
                      {enrolledtestseries.map((item, index) => (
                        <Link
                          to={`/testseries/${item.testseriesId}`}
                          key={item.testseriesId}
                        >
                          <div className="cursor-pointer relative account-courses-card gap-1 rounded-xl flex flex-col items-center">
                            <img
                              src={item.thumbnail || imgplaceholder}
                              className="h-72 w-full object-cover rounded-xl"
                            />

                            <p className="w-11/12 font-medium text-black1 text-xl py-4">
                              {item.testseriesName}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {enrolledtestseries && enrolledtestseries.length == 0 && (
                        <section className="w-screen flex flex-col gap-4 items-center justify-center">
                          <img
                            src={emptycart}
                            alt="no courses enrolled"
                            className="w-1/4 md:w-1/2"
                          />
                          <p className="text-4xl md:text-3xl font-semibold">
                            No TestSeries Enrolled
                          </p>
                          <p className="text-lg md:text-base font-normal">
                            Enroll Testseries to practice
                          </p>
                          <button
                            className="rounded-xl bg-blue text-white py-2 px-4"
                            onClick={viewalltestseriesf}
                          >
                            View All Testseries
                          </button>
                        </section>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
