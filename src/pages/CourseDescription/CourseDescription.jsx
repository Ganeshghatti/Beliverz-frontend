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

export default function CourseDescription() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          setLoading(true);
          console.log(courseId);
          const response = await axios.get(
            `http://localhost:5000/user/courses/${courseId}`
          );
          console.log(response)
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

  return (
    <div className="CourseDescription" id="CourseDescription">
      <Stack spacing={2}>{alert}</Stack>
      {loading ? <Spinnerf /> : <></>}
    </div>
  );
}
