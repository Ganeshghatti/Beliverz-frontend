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

export default function Account() {
  const user = useSelector((state) => state.user.user);
  const [enrolledcourses, setenrolledcourses] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token.length > 1) {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/user/account/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response.data.user.coursesEnrolled);
          setenrolledcourses(response.data.user.coursesEnrolled);
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
                <p className="w-3/5 md:w-11/12 font-semibold text-black2 text-xl md:text-lg text-center py-16 ">
                  Hi {user.username}, Welcome to courses!
                </p>
              </div>
            )}{" "}
            <div className="flex flex-col justify-center w-full items-center py-16">
              <div className="w-3/4 flex flex-col gap-6 md:w-11/12">
                {enrolledcourses && enrolledcourses.length > 1 && (
                  <p className=" md:w-11/12 font-semibold text-black2 text-xl md:text-lg">
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
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
