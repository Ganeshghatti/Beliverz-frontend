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
import imgplaceholder from "./imgplaceholder.png";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function Courses() {
  const courses = useSelector((state) => state.courses.courses);

  const NextArrow = (props) => (
    <button
      {...props}
      className="custom-next-arrow -right-12 md:hidden absolute top-1/2 bg-white w-8 h-8 rounded-full"
    >
      <ChevronRightIcon className="text-blue text-2xl" />
    </button>
  );

  const PrevArrow = (props) => (
    <button
      {...props}
      className="custom-next-arrow -left-8 md:hidden absolute top-1/2 bg-white w-8 h-8 rounded-full"
    >
      <ChevronLeftIcon className="text-blue text-2xl" />
    </button>
  );
  const testimonailsdata = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    slidesToShow: testimonailsdata.desktop.items,
    slidesToScroll: 1,
    nextArrow: window.innerWidth >= 867 ? <NextArrow /> : false,
    prevArrow: window.innerWidth >= 867 ? <PrevArrow /> : false,
    responsive: [
      {
        breakpoint: testimonailsdata.desktop.breakpoint.max,
        settings: {
          slidesToShow: testimonailsdata.desktop.items,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: testimonailsdata.tablet.breakpoint.max,
        settings: {
          slidesToShow: testimonailsdata.tablet.items,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: testimonailsdata.mobile.breakpoint.max,
        settings: {
          slidesToShow: testimonailsdata.mobile.items,
          slidesToScroll: 1,
        },
      },
    ],
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
      </div>
      <Slider {...settings} className="mt-12 relative w-11/12 overflow-hidden">
        {courses.map((item, index) => (
          <Link to={`/courses/${item.courseId}`} key={item.courseId}>
            <div className="cursor-pointer relative home-courses-card gap-1 rounded-xl flex flex-col items-center">
              <img
                src={item.coursethumbnail || imgplaceholder}
                className="h-72 w-full object-cover rounded-xl"
              />
              <Chip
                label={
                  item.coursepayment === "free" ? (
                    item.coursepayment
                  ) : (
                    <p className="text-sm p-1 flex justify-center items-center">
                      {" "}
                      <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                      {item.courseamountInINR}
                    </p>
                  )
                }
                variant={item.coursepayment === "free" ? "filled" : "outlined"}
                style={{
                  backgroundColor: "#5A81EE",
                  color: "white",
                }}
                className="absolute top-3 right-3 z-50"
              />{" "}
              <div className="w-11/12 flex justify-between">
                <p className="text-sm font-normal text-black1">
                  {item.courselanguage}
                </p>
                <p className="text-sm font-normal text-black1">
                  {item.coursetotalEnrollments} enrollments
                </p>
              </div>
              <p className="w-11/12 font-medium text-black1 text-xl">
                {item.courseName}
              </p>
              <div className="flex justify-between w-11/12 py-4 items-center">
                <button className="button-filled font-medium">
                  Enroll Now
                </button>
                <Rating
                  value={item.courserating}
                  precision={0.25}
                  emptyIcon={<StarBorderIcon style={{ fontSize: "18px" }} />}
                  readOnly
                />
              </div>
            </div>
          </Link>
        ))}

      </Slider>
    </section>
  ) : (
    ""
  );
}
