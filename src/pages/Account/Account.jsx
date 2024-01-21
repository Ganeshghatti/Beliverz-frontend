import React, { useState, useEffect } from "react";
import "./Account.scss";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import imgplaceholder from "./imgplaceholder.jpg";
import { Link } from "react-router-dom";
import Spinnerf from "../../Components/Spinnerf";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Account() {
  const user = useSelector((state) => state.user.user);
  const [enrolledcourses, setenrolledcourses] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token !== null) {
          setLoading(true);
          console.log(user.email);
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/account/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response.data);
          setenrolledcourses(response.data.user.coursesEnrolled);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
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

  return (
    <section id="account" className="w-full flex-col flex items-center  py-20">
      <Stack spacing={2}>{alert}</Stack>
      {user.username && (
        <div className="account-intro w-full flex justify-center">
          <p className="w-3/5 md:w-11/12 font-semibold text-black2 text-xl md:text-lg text-center py-16 ">
            Hi {user.username}, Welcome to courses!
          </p>
        </div>
      )}{" "}
      <div className="flex flex-col justify-center w-full">
        <div className="w-3/5 flex flex-col gap-6 md:w-11/12">
          <p className=" md:w-11/12 font-semibold text-black2 text-xl md:text-lg text-center py-16 ">
            Courses
          </p>
          <div className="flex gap-4 md:flex-col flex-wrap">
            {enrolledcourses && enrolledcourses.length > 0 ? (
              <>
                {enrolledcourses.map((item, index) => (
                  <Card className="cursor-pointer relative home-courses-card mr-8">
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.coursethumbnail || imgplaceholder}
                      style={{ objectFit: "cover" }}
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
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <Spinnerf />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
