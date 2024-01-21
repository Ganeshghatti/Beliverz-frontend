import React, { useEffect } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MailIcon from "@mui/icons-material/Mail";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import logo from "./logo.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const { courseId, email, chapterId, contentId } = useParams();

  const footerdisplay =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname ===
      `/courses/${courseId}/${email}/${chapterId}/${contentId}`;

  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {
    if (location.hash) {
      const targetSection = document.querySelector(location.hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return footerdisplay ? (
""
  ) : (
    <footer
      id="footer"
      className="flex md:flex-col justify-between py-12 md:gap-16 bg-blue "
    >
      <div className="w-2/5 flex flex-col items-center md:w-full">
        <div className="flex flex-col md:items-center justify-center gap-4 w-3/5 md:w-4/5">
          <img className="w-40" src={logo} />
          <p className="text-white font-normal text-lg md:text-base md:text-center">
            Prioritizing dynamic education, fostering excellence for holistic
            growth.
          </p>
        </div>
      </div>
      {courses.length > 1 && (
        <>
          <ul className="text-white flex flex-col custom-width-15 gap-6 font-normal md:w-full md:items-center">
            <p className="text-2xl md:text-xl font-semibold">Courses</p>
            {courses.map((course, index) => (
              <li className="md:text-center" key={index}>
                <Link to={course.courseroute}>{course.courseName}</Link>
              </li>
            ))}
          </ul>{" "}
        </>
      )}
      <ul className="text-white flex flex-col custom-width-15 gap-6 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-semibold">Company</p>
        <li className=" md:text-center">
          <Link to="/#">Home</Link>
        </li>
        <li className=" md:text-center">
          <Link to="/#overview">About us</Link>
        </li>{" "}
        <li className=" md:text-center">
          <Link to="/#category">Categories</Link>
        </li>
        <li className="md:text-center">
          <Link to="/#WhyUs">Why Choose us?</Link>
        </li>
      </ul>{" "}
      <ul className="text-white flex flex-col custom-width-15 gap-6 font-normal md:w-full md:items-center">
        <p className="text-2xl md:text-xl font-semibold">Resources</p>
        <li className=" md:text-center">
          <Link to="/">Blog</Link>
        </li>
        <li className=" md:text-center">
          <Link to="/#contact">Contact us</Link>
        </li>
        <li className=" md:text-center">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>{" "}
        <li className=" md:text-center">
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </li>
      </ul>
    </footer>  );
}
