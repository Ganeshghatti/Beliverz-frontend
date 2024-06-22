import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TestseriesDescription.scss";
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
import { REACT_APP_BACK_URL } from "../../config/config";

export default function TestseriesDescription() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [instructorloading, setinstructorLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [instructors, setinstructors] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { testseriesId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (testseriesId && user.token) {
          setLoading(true);
          const response = await axios.get(
            `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response.data);
          setFormData(response.data);
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
  }, [testseriesId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (testseriesId) {
          setinstructorLoading(true);
          const response = await axios.get(
            `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}/instructors`
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
            {error.response.data.error}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setinstructorLoading(false);
      }
    };

    fetchData();
  }, [testseriesId]);

  const enrollNowf = async () => {
    if (!user.email) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}/testseries-enroll`,
        { email: user.email, testseriesId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);

      navigate(`/testseries/${response.data.testseriesId}/${user.email}/test`);
    } catch (error) {
      console.log(error);
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
  
  const gotoTestseries = () => {
    navigate(
      `/testseries/${formData.enrolledTestseries.testseriesId}/${user.email}/test`
    );
  };
  return loading ? (
    <>
      <Spinnerf />
      <div className="h-screen w-screen block" />
    </>
  ) : (
    <div
      className="testseriesDescription flex flex-col"
      id="testseriesDescription"
    >
      <Stack spacing={2}>{alert}</Stack>

      {formData &&
        formData.testseries &&
        formData.testseries.testseriesName && (
          <>
            <Navbar />
            <section className="flex testseriesDescription-sec1 w-screen h-screen md:h-auto md:items-center flex-col justify-center pt-10 md:pt-0">
              <div className="testseriesDescription-sec1-details w-2/5 md:w-full md:h-screen md:bg-[#ebeffb] md:justify-center flex flex-col ml-40 md:m-0 gap-4 md:px-6 md:gap-6">
                <p className="text-black1 text-4xl md:text-3xl font-semibold">
                  {formData.testseries.testseriesName}
                </p>
                <p className="text-black1 text-lg md:text-base font-normal">
                  {formData.testseries.testseriesDescription}
                </p>

                {formData.testseries.instructors.length > 0 && (
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
                  {formData.isEnrolled ? (
                    <button
                      className="custom-width-45 bg-[#5A81EE] py-3 md:py-2 rounded-xl text-white text-lg font-semibold"
                      onClick={gotoTestseries}
                    >
                      Retest
                    </button>
                  ) : (
                    <button
                      className="custom-width-45 bg-[#5A81EE] py-3 md:py-2 rounded-xl text-white text-lg font-semibold"
                      onClick={enrollNowf}
                    >
                      Enroll Now!
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-black1 text-4xl md:text-3xl font-semibold">
                    {formData.testseries.totalEnrollments}+
                  </p>
                  <span className="text-sm">Already Enrolled</span>
                </div>
              </div>
              <div className="flex flex-col CourseDescription-sec1-stats md:block gap-4 md:w-11/12">
                <div className="flex flex-col md:w-full gap-6 py-12 px-10">
                  <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.0084 8.98178C11.3006 8.71109 11.6883 8.56756 12.0863 8.58276C12.4844 8.59797 12.86 8.77066 13.1307 9.06285C13.4014 9.35504 13.5449 9.7428 13.5297 10.1408L13.5291 10.1649C13.5264 10.3566 13.4854 10.5459 13.4085 10.7216C13.3317 10.8972 13.2205 11.0558 13.0815 11.1878C12.9424 11.3199 12.7784 11.4229 12.5991 11.4907C12.4197 11.5585 12.2286 11.5898 12.037 11.5827C11.7656 11.5726 11.5017 11.6734 11.3061 11.8619C11.1105 12.0504 11 12.3104 11 12.582V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V13.4611C13.1034 13.4328 13.2056 13.3995 13.3063 13.3615C13.7349 13.1994 14.1269 12.9534 14.4591 12.6377C14.7913 12.3221 15.0571 11.9432 15.2408 11.5234C15.4229 11.1073 15.5207 10.6592 15.5287 10.2052C15.5608 9.28131 15.2263 8.38203 14.5979 7.70365C13.9667 7.02234 13.0907 6.61967 12.1627 6.58422C11.2346 6.54877 10.3305 6.88344 9.64917 7.51461C8.96786 8.14578 8.56519 9.02175 8.52973 9.94982C8.50865 10.5017 8.93895 10.9662 9.49083 10.9873C10.0427 11.0083 10.5072 10.578 10.5283 10.0262C10.5435 9.62815 10.7162 9.25247 11.0084 8.98178ZM11.99 16.0078C11.4377 16.0078 10.99 16.4555 10.99 17.0078C10.99 17.5601 11.4377 18.0078 11.99 18.0078H12C12.5523 18.0078 13 17.5601 13 17.0078C13 16.4555 12.5523 16.0078 12 16.0078H11.99Z"
                        fill="#5A81EE"
                      />
                    </svg>
                    <span>
                      {formData.testseries.numberofQuestions} Questions
                    </span>
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
                      {formData.testseries.rating}
                    </p>
                    <div className="flex flex-col justify-center">
                      <Rating
                        value={formData.rating}
                        precision={0.25}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        readOnly
                      />{" "}
                      <span className="text-[#586174] text-sm md:text-xs font-normal">
                        ({formData.testseries.NumberOfRatings} student reviews )
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
                    <span> Duration : {formData.testseries.maxTime} min</span>
                  </p>
                  {/* <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
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
                </p> */}
                  {/* <p className="text-black1 text-xl md:text-lg font-medium flex items-center gap-4">
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
                </p> */}
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
                    {formData.testseries.payment === "free" ? (
                      <span>Free</span>
                    ) : (
                      <>
                        <CurrencyRupeeIcon />
                        {formData.testseries.amountInINR}
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </section>
            <section className="flex justify-center gap-10 items-center w-full md:flex-col-reverse py-16">
              <div className="flex flex-col gap-8 w-1/2 md:w-11/12">
                {formData.testseries.testInstructions.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-black1 text-2xl md:text-xl font-semibold">
                      Test Instructions
                    </p>
                    <ul className="flex flex-wrap md:flex-col justify-between gap-y-4">
                      {formData.testseries.testInstructions.map(
                        (item, index) => (
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
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {instructors && instructors.length > 0 && (
                <div
                  id="testseries-instructors"
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
