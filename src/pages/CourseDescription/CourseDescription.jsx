import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CourseDescription.scss";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import imgplaceholder from "./imgplaceholder.jpg";
import Spinnerf from "../../Components/Spinnerf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LinearProgress from "@mui/joy/LinearProgress";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@mui/joy/Avatar";
import AccordionGroup from "@mui/joy/AccordionGroup";

const videoStyle = {
  width: "100%",
  height: "auto",
};
const fullscreenvideoStyle = {
  width: "85vw",
  height: "auto",
};
export default function CourseDescription() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [instructorloading, setinstructorLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [fullscreenvideo, setfullscreenvideo] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [instructors, setinstructors] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { courseId } = useParams();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  const fullscreenvideof = () => {
    setfullscreenvideo(!fullscreenvideo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          setLoading(true);
          console.log(courseId);
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}`
          );
          setFormData(response.data.course);
          setLoading(false);
        }
      } catch (error) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            {error.response}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          setinstructorLoading(true);
          console.log(courseId);
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}/instructors`
          );
          console.log(response.data.instructors);
          setinstructors(response.data.instructors);
          setinstructorLoading(false);
        }
      } catch (error) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            {error.response}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setinstructorLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const enrollNowf = async () => {
    if (!user.email) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://beliverz-user-server.vercel.app/user/courses/${courseId}/course-enroll`,
        { email: user.email, courseId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      localStorage.setItem(
        `${response.data.courseId}`,
        JSON.stringify({
          courseId: response.data.courseId,
          chapterId: response.data.chapterId,
          contentId: response.data.contentId,
        })
      );
      setLoading(false);

      navigate(
        `/courses/${response.data.courseId}/${user.email}/${response.data.chapterId}/${response.data.contentId}`
      );
    } catch (error) {
      setLoading(false);
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
    }
  };
  const scrollToSection = (section) => {
    const targetSection = document.getElementById(section);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      window.location.hash = section;
    }
  };

  return loading ? (
    <>
      <Spinnerf />
      <div className="h-screen w-screen block" />
    </>
  ) : (
    <div className="CourseDescription flex flex-col" id="CourseDescription">
      <Stack spacing={2}>{alert}</Stack>
      {formData.introVideo && (
        <>
          {fullscreenvideo && (
            <div
              className="fixed w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center z-50"
              onClick={fullscreenvideof}
            >
              {formData.introVideo ? (
                <video style={fullscreenvideoStyle} controls>
                  <source src={formData.introVideo} type="video/mp4" />
                  Your browser does not support the video
                </video>
              ) : (
                <LinearProgress
                  color="primary"
                  determinate={false}
                  size="md"
                  variant="soft"
                />
              )}
            </div>
          )}
        </>
      )}

      {formData && formData.courseName && (
        <>
          <section className="flex CourseDescription-sec1 w-screen h-screen md:h-auto md:items-center flex-col justify-center pt-10 md:pt-0">
            <div className="CourseDescription-sec1-details w-2/5 md:w-full md:h-screen md:bg-[#ebeffb] md:justify-center flex flex-col ml-40 md:m-0 gap-4 md:px-6 md:gap-6">
              <p className="text-black1 text-4xl md:text-3xl font-semibold">
                {formData.courseName}
              </p>
              <p className="text-black1 text-lg md:text-base font-normal">
                {formData.courseDescription}
              </p>
              <p className="text-black1 text-base font-normal">
                {formData.language && (
                  <span className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M8.15117 9.9L10.6133 12.3664L9.70234 14.5664L6.6 11.4426L2.96914 15.0734L1.43086 13.5094L5.04023 9.9L4.07344 8.9332C3.48906 8.34883 2.97344 7.50234 2.64258 6.6H5.06172C5.225 6.90938 5.42695 7.18437 5.62461 7.36914L6.6043 8.35742L7.57109 7.39062C8.23281 6.70742 8.8043 5.32383 8.8043 4.4H0V2.2H5.5V0H7.7V2.2H13.2V4.4H11C11 5.9082 10.1879 7.86328 9.13086 8.9332L8.14258 9.9H8.15117ZM12.375 18.7L11 22H8.8L14.3 8.8H16.5L22 22H19.8L18.425 18.7H12.375ZM13.2902 16.5H17.5141L15.4043 11.4383L13.2902 16.5Z"
                        fill="#262626"
                      />
                    </svg>
                    Taught in {formData.language}
                  </span>
                )}
              </p>
              {formData.instructors.length > 0 && (
                <button
                  onClick={() => scrollToSection("course-instructors")}
                  className=" p-0 flex items-center w-fit mt-2"
                >
                  <img src="/public\assets\Images\Courses\Instructors.png" />{" "}
                  <p className="text-lg font-semibold text-black1">
                    Instructors
                  </p>
                </button>
              )}

              <div className="flex gap-3.5 w-3/5 md:w-full justify-between my-4">
                <button
                  className="custom-width-45 bg-[#5A81EE] py-3 md:py-2 rounded-xl text-white text-lg font-semibold"
                  onClick={enrollNowf}
                >
                  Enroll Now!
                </button>
                {formData.introVideo && (
                  <button
                    className="custom-width-45 text-[#5A81EE] py-3 md:py-2 rounded-xl flex gap-1 items-center text-lg font-semibold"
                    onClick={fullscreenvideof}
                  >
                    Watch Intro
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="bg-[#D3DFFF] w-8 h-8 rounded-full p-5"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="23"
                          viewBox="0 0 25 23"
                          fill="none"
                        >
                          <path
                            d="M7.21582 6.53585V16.4642C7.21582 17.2213 8.12207 17.6813 8.81999 17.2692L17.2992 12.305C17.945 11.9313 17.945 11.0688 17.2992 10.6854L8.81999 5.73085C8.12207 5.31877 7.21582 5.77877 7.21582 6.53585Z"
                            fill="#5A81EE"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-black1 text-4xl md:text-3xl font-semibold">
                  {formData.courseInfo.totalEnrollments}+
                </p>
                <span className="text-sm">Already Enrolled</span>
              </div>
            </div>
            <div className="CourseDescription-sec1-stats md:block flex flex-col md:w-full gap-5 p-8">
              {formData.courseCategory.length > 0 && (
                <ul className="flex">
                  {formData.courseCategory.map((item, index) => (
                    <li className="text-black1 text-2xl md:text-xl font-medium pr-2">
                      {item.categoryName}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-black1 text-2xl md:text-xl font-medium">
                {formData.courseInfo.level}
              </p>
              <div className="flex flex-col gap-1">
                <Rating
                  value={formData.rating}
                  precision={0.25}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <span className="flex gap-6 items-center">
                  <span className="text-black1 text-2xl md:text-xl font-medium">
                    {formData.rating}
                  </span>
                  <span className="text-[#586174] text-base md:text-sm font-normal">
                    ({formData.NumberOfRatings})
                  </span>
                </span>
              </div>
              <p className="text-black1 text-2xl md:text-xl font-medium">
                Duration : {formData.courseDetail.totalHours} hours
              </p>
              <p className="text-black1 text-2xl md:text-xl font-medium">
                {formData.courseDetail.numberOfChapters} Chapters
              </p>{" "}
              <p className="text-black1 text-2xl md:text-xl font-medium">
                Earn a certificate
              </p>
            </div>
          </section>
          <section className="flex justify-center gap-10 items-center w-full md:flex-col-reverse py-16">
            <div className="flex flex-col gap-8 w-1/2 md:w-11/12">
              {formData.whatWillYouLearn.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-black1 text-2xl md:text-xl font-semibold">
                    What you'll learn
                  </p>
                  <ul className="flex flex-wrap md:flex-col justify-between gap-y-4">
                    {formData.whatWillYouLearn.map((item, index) => (
                      <li
                        className="text-lg text-black2 md:text-base font-normal flex items-start custom-width-45 md:w-full"
                        key={index}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-blue font-bold text-xl pr-2 pt-1"
                        />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formData.courseDetail.tags.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-black1 text-2xl md:text-xl font-semibold">
                    Skills you'll gain
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.courseDetail.tags.map((item, index) => (
                      <Chip
                        label={item}
                        variant="filled"
                        style={{
                          backgroundColor: "#5A81EE",
                          color: "white",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 w-1/3 md:w-11/12">
              {formData.introVideo && (
                <video style={videoStyle} controls>
                  <source src={formData.introVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </section>
          <section className="flex md:flex-col justify-between custom-width-88 md:w-11/12 mx-auto py-12 items-center">
            <div className="flex flex-col w-2/3  md:w-full">
              <AccordionGroup>
                {formData.chapters && (
                  <>
                    {formData.chapters.map((chapter, index) => (
                      <Accordion
                        expanded={expandedPanel === `panel${index}-`}
                        onChange={handleChange(`panel${index}-`)}
                        className="p-4"
                      >
                        <AccordionSummary
                          expandIcon={
                            expandedPanel === `panel${index}-` ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowUpIcon />
                            )
                          }
                          aria-controls={`panel${index}-a-content`}
                          id={`panel${index}-a-header`}
                        >
                          <p
                            className={` text-2xl md:text-xl font-semibold ${
                              expandedPanel === `panel${index}-`
                                ? "text-blue"
                                : "text-black"
                            }`}
                          >
                            {chapter.chapterName}
                          </p>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-gray2 text-xl md:text-lg">
                            Our Investment Banking consultants provide advisory
                            services addressing the need for better Financial
                            Management. We also assist in Mergers and
                            acquisitions (M&A) advice, divestitures, and
                            assistance for strategic partnerships are key areas
                            of focus.
                          </p>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                )}
              </AccordionGroup>
            </div>
            {instructorloading ? (
              <Spinnerf />
            ) : (
              <div
                id="course-instructors"
                style={{ border: "1px solid #5a81ee" }}
                className="w-1/4 flex p-12 flex-col gap-12 md:w-full justify-center rounded-xl"
              >
                <p className="text-black1 text-2xl md:text-xl font-semibold">
                  Instructors
                </p>
                <div className="flex flex-col gap-4 w-full">
                  {instructors.map((item, index) => (
                    <div className="w-full flex justify-left gap-4 items-center mx-auto ">
                      <Avatar src={item.photo && item.photo} />
                      <p className="text-black2 font-medium text-lg md:text-base underline">
                        {item.instructorName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
