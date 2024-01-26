import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveuser, logout } from "../../features/User";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import {
  faBars,
  faCancel,
  faCartShopping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import Spinnerf from "../../Components/Spinnerf";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useParams } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, email, chapterId, contentId } = useParams();

  const [menu, setmenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const courses = useSelector((state) => state.courses.courses);
  const category = useSelector((state) => state.category.categories);

  const logoutf = async () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = "/";
  };
  const navbardisplay =
    location.pathname === "/login" ||
    location.pathname === "/signup" ;
    
  const menuf = () => {
    setmenu(!menu);
  };

  const isActiveTab = (path) => {
    const parts = path.split("/");
    const result = "/" + parts[1];
    const currentpath = location.pathname.split("/");
    const currentpathresult = "/" + currentpath[1];
    return currentpathresult === result;
  };
  const mobilenavf = (event) => {
    navigate(`/courses/${event.target.value}`);
    setmenu(!menu);
  };

  return navbardisplay ? (
    ""
  ) : (
    <nav
      id="navbar"
      className="absolute w-screen flex justify-around items-center py-12 z-50 md:justify-between md:overflow-x-hidden md:px-8 left-0 top-0"
    >
      {menu ? (
        <div className="hidden md:block">
          <div
            className="fixed w-screen h-screen top-0 left-0 z-30"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.353)" }}
            onClick={menuf}
          ></div>
          <div
            className="flex flex-col w-3/4 h-screen fixed right-0 top-0 justify-center items-center z-50 gap-8 bg-white navbar-mobile-menu"
            style={{ backgroundColor: "white" }}
          >
            <ul className="list-none flex flex-col gap-10 items-center justify-center">
              <li onClick={menuf}>
                <Link
                  to="/"
                  className={`${
                    isActiveTab("/") ? "text-blue" : "text-black2"
                  } hover:text-blue`}
                >
                  Home
                </Link>
              </li>
              <li className="flex justify-center">
                <select
                  onChange={mobilenavf}
                  className="bg-white border-none flex justify-center p-2  w-2/3"
                >
                  <option value="" className=" w-fit">
                    Select a Course
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course.courseId}
                      value={course.courseId}
                      className="flex justify-center p-2 "
                    >
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </li>
              <li onClick={menuf}>
                <Link
                  to="/#category"
                  className={`${
                    isActiveTab("/") ? "text-black2" : "text-blue"
                  } hover:text-blue`}
                >
                  Categories
                </Link>
              </li>{" "}
              {/* <li onClick={menuf}>
                <Link
                  to="/instructors"
                  className={`${
                    isActiveTab("/") ? "text-black2" : "text-blue"
                  } hover:text-blue`}
                >
                  Instructors
                </Link>
              </li>{" "} */}
              {/* <li onClick={menuf}>
                <Link
                  to="/#testimonials"
                  className="text-black2 hover:text-blue"
                >
                  Testimonials
                </Link>
              </li>{" "} */}
              <li onClick={menuf}>
                <Link to="/#contact" className="text-black2 hover:text-blue">
                  Contact
                </Link>
              </li>
            </ul>

            {!user.token ? (
              <div className="md:flex flex-col gap-8 hidden items-center mt-10">
                <Link to="/signup">
                  <button className="button-outlined">Signup</button>
                </Link>

                <Link to="/login">
                  <button className="button-filled">Login</button>
                </Link>
              </div>
            ) : (
              <div className="md:flex flex-col gap-12 hidden items-center mt-10">
                <div className="flex flex-col items-center" onClick={menuf}>
                  <Link
                    to="/account"
                    className="hover:text-blue text-black2 flex flex-col items-center"
                  >
                    <AccountCircleIcon />
                    <p>My Account</p>
                  </Link>
                </div>
                <button className="button-outlined" onClick={logoutf}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <Link to="/">
        <img src={logo} alt="logo" className="w-40 md:w-24" />
      </Link>

      <ul
        className="flex items-center list-none md:hidden text-black1"
        style={{ gap: "2.5vw" }}
      >
        <li>
          <Link
            to="/"
            className={
              isActiveTab("/") ? "text-blue font-semibold" : "text-black1"
            }
          >
            Home
          </Link>
        </li>

        <li className="hover:text-navyblue cursor-pointer">
          <div className="dropdown">
            <span
              className={`${
                isActiveTab("/courses") ? "text-blue" : "text-black1"
              } hover:text-blue  flex items-end`}
            >
              Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mb-0.5"
              >
                <path
                  d="M10.5832 6.00018L7.99657 8.58684L5.4099 6.00018C5.1499 5.74018 4.7299 5.74018 4.4699 6.00018C4.2099 6.26018 4.2099 6.68018 4.4699 6.94018L7.5299 10.0002C7.7899 10.2602 8.2099 10.2602 8.4699 10.0002L11.5299 6.94018C11.7899 6.68018 11.7899 6.26018 11.5299 6.00018C11.2699 5.74684 10.8432 5.74018 10.5832 6.00018Z"
                  fill="#131316"
                />
              </svg>
            </span>
            {courses ? (
              <ul className="dropdown-content pt-6">
                {courses.map((item, index) => (
                  <li key={item.courseId} className="flex items-center">
                    <Link
                      to={`/courses/${item.courseId}`}
                      className="hover:text-blue flex items-center text-black2"
                    >
                      <ArrowRightIcon className="text-blue" />
                      <p>{item.courseName}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Spinnerf />
            )}
          </div>
        </li>
        <li>
          <Link
            to="/#category"
            className={`${
              isActiveTab("/category")
                ? "text-blue font-semibold"
                : "text-black1"
            } hover:text-blue`}
          >
            Categories
          </Link>
        </li>
        {/* <li>
          <Link
            to="/instructors"
            className={`${
              isActiveTab("/instructors")
                ? "text-blue font-semibold"
                : "text-black1"
            } hover:text-blue`}
          >
            Instructors
          </Link>
        </li> */}

        {/* <li>
          <Link to="/#testimonials" className="hover:text-blue text-black1">
            Testimonials
          </Link>
        </li> */}
        <li>
          <Link to="/#contact" className="hover:text-blue text-black1">
            Contact
          </Link>
        </li>
      </ul>
      {!user.token ? (
        <div className="flex gap-8 md:hidden items-center">
          <Link to="/signup">
            <button className="button-outlined">Signup</button>
          </Link>

          <Link to="/login" className="md:hidden">
            <button className="button-filled">Login</button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-12 md:hidden items-center">
          <div className="flex flex-col items-center">
            <Link
              to="/account"
              className="hover:text-blue text-black2 flex flex-col items-center"
            >
              <AccountCircleIcon />
              <p>My Account</p>
            </Link>
          </div>
          <button className="button-outlined" onClick={logoutf}>
            Logout
          </button>
        </div>
      )}

      <div className="hidden md:flex md:items-center">
        {menu ? (
          <FontAwesomeIcon
            icon={faClose}
            onClick={menuf}
            className="cursor-pointer text-2xl cancel-icon fixed top-10 right-6 z-50"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            onClick={menuf}
            className="cursor-pointer text-2xl"
          />
        )}
      </div>
    </nav>
  );
}
