import React from "react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import imgplaceholder from "./imgplaceholder.jpg";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Courses() {
  const courses = useSelector((state) => state.courses.courses);

  const getSlidesToShow = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      return 3.5;
    } else if (screenWidth >= 600) {
      return 2;
    } else {
      return 1;
    }
  };
  const NextArrow = (props) => (
    <button
      {...props}
      className="custom-next-arrow -right-12 absolute top-1/2 bg-white w-8 h-8 rounded-full"
    >
      <ChevronRightIcon className="text-blue text-2xl" />
    </button>
  );

  const PrevArrow = (props) => (
    <button
      {...props}
      className="custom-next-arrow -left-8 absolute top-1/2 bg-white w-8 h-8 rounded-full"
    >
      <ChevronLeftIcon className="text-blue text-2xl" />
    </button>
  );
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    draggable: window.innerWidth < 867,
    nextArrow: window.innerWidth >= 867 ? <NextArrow /> : null,
    prevArrow: window.innerWidth >= 867 ? <PrevArrow /> : null,
  };

  return courses && courses.length > 1 ? (
    <section
      id="courses"
      className="w-full py-24 flex items-center justify-center flex-col"
    >
      <div className="custom-width-88 mx-auto ">
        <p
          className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
          style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
        >
          Most <span className="text-blue font-medium">Popular Course</span>
        </p>
        <p className="text-lg text-black3 md:text-base md:text-center">
          In-demand Learning: Top-rated courses for skill mastery.
        </p>
      </div>{" "}
      <Slider {...sliderSettings} className="mt-12 relative w-11/12">
        {courses.map((item, index) => (
          <Link to={item.courseId} key={item.courseId}>
            <Card className="cursor-pointer relative home-courses-card mr-8">
              <CardMedia
                component="img"
                height="140"
                image={item.coursethumbnail || imgplaceholder}
                style={{ objectFit: "contain" }}
              />
              <Chip
                label={item.coursepayment}
                variant={item.coursepayment === "free" ? "outlined" : "filled"}
                style={{
                  backgroundColor:
                    item.coursepayment === "free" ? "transparent" : "#FF9D03",
                  color: item.coursepayment === "free" ? "black" : "white",
                }}
                className="absolute top-3 right-3 z-50"
              />
              <div className="p-6 flex flex-col">
                <Rating
                  value={item.courserating}
                  precision={0.25}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p className="font-semibold text-2xl md:text-xl">
                  {item.courseName}
                </p>
                <p className="text-xl md:text-lg font-bold">
                  <span className="text-2xl font-bold">
                    {item.coursetotalEnrollments}
                  </span>
                  enrollments
                </p>
              </div>
            </Card>
          </Link>
        ))}{" "}
        {courses.map((item, index) => (
          <Link to={item.courseroute} key={item.courseId}>
            <Card className="cursor-pointer relative home-courses-card mr-8">
              <CardMedia
                component="img"
                height="140"
                image={item.coursethumbnail || imgplaceholder}
                style={{ objectFit: "contain" }}
              />
              <Chip
                label={item.coursepayment}
                variant={item.coursepayment === "free" ? "outlined" : "filled"}
                style={{
                  backgroundColor:
                    item.coursepayment === "free" ? "transparent" : "#FF9D03",
                  color: item.coursepayment === "free" ? "black" : "white",
                }}
                className="absolute top-3 right-3 z-50"
              />
              <div className="p-6 flex flex-col">
                <Rating
                  value={item.courserating}
                  precision={0.25}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p className="font-semibold text-2xl md:text-xl">
                  {item.courseName}
                </p>
                <p className="text-xl md:text-lg font-bold">
                  <span className="text-2xl font-bold">
                    {item.coursetotalEnrollments}
                  </span>
                  enrollments
                </p>
              </div>
            </Card>
          </Link>
        ))}{" "}
        {courses.map((item, index) => (
          <Link to={item.courseroute} key={item.courseId}>
            <Card className="cursor-pointer relative home-courses-card mr-8">
              <CardMedia
                component="img"
                height="140"
                image={item.coursethumbnail || imgplaceholder}
                style={{ objectFit: "contain" }}
              />
              <Chip
                label={item.coursepayment}
                variant={item.coursepayment === "free" ? "outlined" : "filled"}
                style={{
                  backgroundColor:
                    item.coursepayment === "free" ? "transparent" : "#FF9D03",
                  color: item.coursepayment === "free" ? "black" : "white",
                }}
                className="absolute top-3 right-3 z-50"
              />
              <div className="p-6 flex flex-col">
                <Rating
                  value={item.courserating}
                  precision={0.25}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  readOnly
                />
                <p className="font-semibold text-2xl md:text-xl">
                  {item.courseName}
                </p>
                <p className="text-xl md:text-lg font-bold">
                  <span className="text-2xl font-bold">
                    {item.coursetotalEnrollments}
                  </span>
                  enrollments
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </Slider>
    </section>
  ) : (
    ""
  );
}
