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
import imgplaceholder from "./imgplaceholder.png";
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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import instructorsimg from "./Instructors.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}`
          );
          console.log(response.data.course);
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
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}/instructors`
          );
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
        `/courses/${response.data.currentlywatching.courseId}/${user.email}/${response.data.currentlywatching.chapterId}/${response.data.currentlywatching.contentId}`
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
          <Navbar />
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
                  <img src={instructorsimg} />{" "}
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
            <div className="flex flex-col CourseDescription-sec1-stats md:block gap-4 md:w-11/12">
              <div className="flex flex-col md:w-full gap-6 py-12 px-10">
                <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M4.67 12.707H2C0.9 12.707 0 13.607 0 14.707V19.707C0 20.257 0.45 20.707 1 20.707H4.67C5.22 20.707 5.67 20.257 5.67 19.707V13.707C5.67 13.157 5.22 12.707 4.67 12.707Z"
                      fill="#5A81EE"
                    />
                    <path
                      d="M11.3302 8.70703H8.66016C7.56016 8.70703 6.66016 9.60703 6.66016 10.707V19.707C6.66016 20.257 7.11016 20.707 7.66016 20.707H12.3302C12.8802 20.707 13.3302 20.257 13.3302 19.707V10.707C13.3302 9.60703 12.4402 8.70703 11.3302 8.70703Z"
                      fill="#5A81EE"
                    />
                    <path
                      d="M18.0001 15.707H15.3301C14.7801 15.707 14.3301 16.157 14.3301 16.707V19.707C14.3301 20.257 14.7801 20.707 15.3301 20.707H19.0001C19.5501 20.707 20.0001 20.257 20.0001 19.707V17.707C20.0001 16.607 19.1001 15.707 18.0001 15.707Z"
                      fill="#5A81EE"
                    />
                    <path
                      d="M13.0095 3.5575C13.3195 3.2475 13.4395 2.8775 13.3395 2.5575C13.2395 2.2375 12.9295 2.0075 12.4895 1.9375L11.5295 1.7775C11.4895 1.7775 11.3995 1.7075 11.3795 1.6675L10.8495 0.6075C10.4495 -0.2025 9.53945 -0.2025 9.13945 0.6075L8.60945 1.6675C8.59945 1.7075 8.50945 1.7775 8.46945 1.7775L7.50945 1.9375C7.06945 2.0075 6.76945 2.2375 6.65945 2.5575C6.55945 2.8775 6.67945 3.2475 6.98945 3.5575L7.72945 4.3075C7.76945 4.3375 7.79945 4.4575 7.78945 4.4975L7.57945 5.4175C7.41945 6.1075 7.67945 6.4175 7.84945 6.5375C8.01945 6.6575 8.38945 6.8175 8.99945 6.4575L9.89945 5.9275C9.93945 5.8975 10.0695 5.8975 10.1095 5.9275L10.9995 6.4575C11.2795 6.6275 11.5095 6.6775 11.6895 6.6775C11.8995 6.6775 12.0495 6.5975 12.1395 6.5375C12.3095 6.4175 12.5695 6.1075 12.4095 5.4175L12.1995 4.4975C12.1895 4.4475 12.2195 4.3375 12.2595 4.3075L13.0095 3.5575Z"
                      fill="#5A81EE"
                    />
                  </svg>
                  <span>{formData.courseInfo.level}</span>
                </p>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M10.295 16.031L3.93182 20L5.66174 12.5926L0 7.63958L7.4317 7.03151L10.295 0L13.1584 7.03151L20.5912 7.63958L14.9284 12.5926L16.6583 20L10.295 16.031Z"
                      fill="#5A81EE"
                    />
                  </svg>
                  <p className="text-black1 text-xl md:text-lg font-medium">
                    {formData.rating}
                  </p>
                  <div className="flex flex-col justify-center">
                    <Rating
                      value={formData.rating}
                      precision={0.25}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      readOnly
                    />{" "}
                    <span className="text-[#586174] text-sm md:text-xs font-normal">
                      ({formData.NumberOfRatings} student reviews )
                    </span>
                  </div>
                </div>
                <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M10 0.0673828C4.49 0.0673828 0 4.55738 0 10.0674C0 15.5774 4.49 20.0674 10 20.0674C15.51 20.0674 20 15.5774 20 10.0674C20 4.55738 15.51 0.0673828 10 0.0673828ZM14.35 13.6374C14.21 13.8774 13.96 14.0074 13.7 14.0074C13.57 14.0074 13.44 13.9774 13.32 13.8974L10.22 12.0474C9.45 11.5874 8.88 10.5774 8.88 9.68738V5.58738C8.88 5.17738 9.22 4.83738 9.63 4.83738C10.04 4.83738 10.38 5.17738 10.38 5.58738V9.68738C10.38 10.0474 10.68 10.5774 10.99 10.7574L14.09 12.6074C14.45 12.8174 14.57 13.2774 14.35 13.6374Z"
                      fill="#5A81EE"
                    />
                  </svg>
                  <span>
                    {" "}
                    Duration : {formData.courseDetail.totalHours} hours
                  </span>
                </p>
                <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="21"
                    viewBox="0 0 19 21"
                    fill="none"
                  >
                    <path
                      d="M14.2491 13.7114C14.9191 13.2714 15.7991 13.7514 15.7991 14.5514V15.8414C15.7991 17.1114 14.8091 18.4714 13.6191 18.8714L10.4291 19.9314C9.86906 20.1214 8.95906 20.1214 8.40906 19.9314L5.21906 18.8714C4.01906 18.4714 3.03906 17.1114 3.03906 15.8414V14.5414C3.03906 13.7514 3.91906 13.2714 4.57906 13.7014L6.63906 15.0414C7.42906 15.5714 8.42906 15.8314 9.42906 15.8314C10.4291 15.8314 11.4291 15.5714 12.2191 15.0414L14.2491 13.7114Z"
                      fill="#5A81EE"
                    />
                    <path
                      d="M17.3975 4.52988L11.4075 0.599883C10.3275 -0.110117 8.5475 -0.110117 7.4675 0.599883L1.4475 4.52988C-0.4825 5.77988 -0.4825 8.60988 1.4475 9.86988L3.0475 10.9099L7.4675 13.7899C8.5475 14.4999 10.3275 14.4999 11.4075 13.7899L15.7975 10.9099L17.1675 10.0099V13.0699C17.1675 13.4799 17.5075 13.8199 17.9175 13.8199C18.3275 13.8199 18.6675 13.4799 18.6675 13.0699V8.14988C19.0675 6.85988 18.6575 5.35988 17.3975 4.52988Z"
                      fill="#5A81EE"
                    />
                  </svg>
                  <span>
                    {" "}
                    {formData.courseDetail.numberOfChapters} Chapters
                  </span>
                </p>
                <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="21"
                    viewBox="0 0 17 21"
                    fill="none"
                  >
                    <path
                      d="M17 14.0737V16.5737C17 18.5037 15.43 20.0737 13.5 20.0737H3.5C1.57 20.0737 0 18.5037 0 16.5737V15.9237C0 14.3537 1.28 13.0737 2.85 13.0737H16C16.55 13.0737 17 13.5237 17 14.0737Z"
                      fill="#5A81EE"
                    />
                    <path
                      d="M12 0.0737305H5C1 0.0737305 0 1.07373 0 5.07373V12.6537C0.76 11.9837 1.76 11.5737 2.85 11.5737H16C16.55 11.5737 17 11.1237 17 10.5737V5.07373C17 1.07373 16 0.0737305 12 0.0737305ZM9.5 8.82373H4.5C4.09 8.82373 3.75 8.48373 3.75 8.07373C3.75 7.66373 4.09 7.32373 4.5 7.32373H9.5C9.91 7.32373 10.25 7.66373 10.25 8.07373C10.25 8.48373 9.91 8.82373 9.5 8.82373ZM12.5 5.32373H4.5C4.09 5.32373 3.75 4.98373 3.75 4.57373C3.75 4.16373 4.09 3.82373 4.5 3.82373H12.5C12.91 3.82373 13.25 4.16373 13.25 4.57373C13.25 4.98373 12.91 5.32373 12.5 5.32373Z"
                      fill="#5A81EE"
                    />
                  </svg>
                  Earn a certificate
                </p>
              </div>
              <div className="w-full flex">
                <Link
                  to="/#category"
                  className="bg-black1 text-white w-1/2 py-5 text-center text-xl font-semibold"
                  style={{ borderRadius: "0 0  0 20px" }}
                >
                  View all Courses
                </Link>
                <Link
                  to="/#category"
                  className="bg-blue text-white w-1/2 py-5 text-center text-xl font-semibold items-center flex justify-center"
                  style={{ borderRadius: "0 0  20px 0" }}
                >
                  {formData.payment === "free" ? (
                    <span>Free</span>
                  ) : (
                    <>
                      <CurrencyRupeeIcon />
                      {formData.amountInINR}
                    </>
                  )}
                </Link>
              </div>
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
          <section className="flex md:flex-col md:gap-8 justify-between custom-width-88 md:w-11/12 mx-auto py-12 items-start">
            <div
              className="flex flex-col w-2/3  md:w-full"
              style={{ border: "1px solid #262626", borderRadius: "15px" }}
            >
              {formData.chapters && (
                <>
                  {formData.chapters.map((chapter, index) => (
                    <Accordion
                      expanded={expandedPanel === `panel${index}-`}
                      onChange={handleChange(`panel${index}-`)}
                      style={{ boxShadow: "0", border: "0" }}
                      className="p-4 CourseDescription-accordian "
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
                        <p className="text-2xl md:text-xl font-semibold underline">
                          {chapter.chapterName}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {chapter.content.map((item, index) => (
                          <p
                            className="px-6 flex items-center gap-4 text-lg md:text-base underline font-medium text-black1 mb-6 mt-2"
                            key={index}
                          >
                            {item.type === "Video" ? (
                              <>
                                <OndemandVideoIcon /> {item.contentName}
                              </>
                            ) : item.type === "Pdf" ? (
                              <>
                                <PictureAsPdfIcon />
                                {item.contentName}
                              </>
                            ) : null}
                          </p>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              )}
            </div>
            {instructorloading ? (
              <Spinnerf />
            ) : (
              <div
                id="course-instructors"
                style={{ border: "1px solid black", borderRadius: "15px" }}
                className="w-1/4 flex  flex-col gap-8 md:w-full justify-center py-6"
              >
                <p className="text-black1 text-2xl md:text-xl font-semibold px-12">
                  Instructors
                </p>
                <div className="flex flex-col w-full">
                  {instructors.map((item, index) => (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="inherit"
                        height="2"
                        viewBox="0 0 inherit 2"
                        fill="none"
                      >
                        <path
                          d="M0 1L433 1.00004"
                          stroke="#262626"
                          stroke-width="0.518456"
                        />
                      </svg>{" "}
                      <div
                        className="w-full flex justify-left gap-4 py-4 items-center mx-auto  px-12"
                        key={index}
                      >
                        <Avatar src={item.photo && item.photo} />
                        <p className="text-black2 font-normal text-base md:text-sm">
                          {item.instructorName}
                        </p>
                      </div>{" "}
                    </>
                  ))}
                </div>
              </div>
            )}
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
