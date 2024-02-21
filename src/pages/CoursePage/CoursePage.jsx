import "./CoursePage.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
  padding: "16px",
  overflow: "auto",
  height: "auto",
  width: "90vw",
  "@media (min-width: 868px)": {
    width: "40vw",
    padding: "32px",
  },
};

export default function CoursePage() {
  const [loading, setLoading] = useState(false);
  const [chapterslist, setchapterslist] = useState();
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [alert, setAlert] = useState(null);
  const [open, setopen] = useState(false);
  const [contentondisplay, setcontentondisplay] = useState();
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [modalopen, setmodalopen] = useState(false);
  const [isfeedbackgiven, setisfeedbackgiven] = useState(true);

  const { courseId, email, chapterId, contentId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleOpen = () => setmodalopen(true);
  const handleClose = () => setmodalopen(false);

  const storedcoursedata = localStorage.getItem(`${courseId}`);
  const contentdata = JSON.parse(storedcoursedata);

  const menuf = () => {
    setopen(!open);
  };

  const handleRatingChange = (event, newValue) => {
    setFeedback((prevFeedback) => ({ ...prevFeedback, rating: newValue }));
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setFeedback((prevFeedback) => ({ ...prevFeedback, comment: newComment }));
  };

  const handlefeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      if (feedback.rating > 0 && courseId && email) {
        setLoading(true);
        const response = await axios.post(
          `https://beliverz-server.vercel.app/user/courses/${courseId}/${email}/submitfeedback`,
          { feedback, courseId, email },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="success"
          >
            Feedback submit successful
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        navigate(
          `/courses/${response.data.currentlywatching.courseId}/${email}/${response.data.currentlywatching.chapterId}/${response.data.currentlywatching.contentId}`
        );
        setFeedback({ rating: 0, comment: "" });
        setLoading(false);
        handleClose();
      }
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token) {
          setLoading(true);
          const response = await axios.get(
            `https://beliverz-server.vercel.app/user/courses/${courseId}/get-chapters-list`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setchapterslist(response.data.chapters);
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
            {error.response}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, user.token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token.length > 1) {
          setLoading(true);
          console.log(user.token);
          const response = await axios.get(
            `https://beliverz-server.vercel.app/user/courses/${courseId}/${email}/${chapterId}/${contentId}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setLoading(false);
          localStorage.setItem(
            `${response.data.currentlywatching.courseId}`,
            JSON.stringify({
              courseId: response.data.currentlywatching.courseId,
              chapterId: response.data.currentlywatching.chapterId,
              contentId: response.data.currentlywatching.contentId,
            })
          );
          setcontentondisplay(response.data.content);
          if (
            response.data.feedback != null &&
            response.data.feedback.rating > 0
          ) {
            setisfeedbackgiven(false);
          }
        }
      } catch (error) {
        setLoading(false);

        console.log(error);
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            {error.response?.data || "An error occurred"}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
      }
    };

    fetchData();
  }, [contentId, user.token]);

  const ChangeContent = async (content, item) => {
    if (content.contentId != contentId) {
      navigate(
        `/courses/${courseId}/${user.email}/${item.chapterId}/${content.contentId}`
      );
    }
  };

  return loading ? (
    <>
      <Spinnerf />
    </>
  ) : (
    <section id="CoursePage" className="flex w-screen h-screen relative">
      <Stack spacing={2}>{alert}</Stack>
      <Modal
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col gap-4">
          <p className="text-4xl md:text-3xl text-black2 font-semibold">
            Feedback
          </p>
          <Rating
            name="rating"
            value={feedback.rating}
            onChange={handleRatingChange}
            precision={1}
            className="w-fit"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            variant="outlined"
            value={feedback.comment}
            onChange={handleCommentChange}
          />
          <button className="button-filled" onClick={handlefeedbackSubmit}>
            Submit
          </button>
        </Box>
      </Modal>
      {open && (
        <div className="overflow-y-auto md:absolute top-0 left-0 h-screen w-96 md:w-full flex flex-col justify-start">
          <div className="w-full bg-blue px-4 h-20 flex items-center justify-between">
            <Link
              to="/account"
              className="flex items-center text-white font-medium text-base cursor-pointer"
            >
              <ArrowBackIcon />
              Back to Home
            </Link>
            <DoubleArrowIcon
              style={{ color: "white" }}
              onClick={menuf}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col overflow-auto w-full">
            {chapterslist ? (
              chapterslist.length > 0 ? (
                <>
                  {chapterslist.map((item, index) => (
                    <Accordion
                      expanded={expandedPanel === `panel${index}-`}
                      onChange={handleChange(`panel${index}-`)}
                      className="p-4"
                      key={index}
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
                        <p className="text-2xl md:text-xl font-medium">
                          {index + 1} . {item.chapterName}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {item.content.map((content, contentindex) => (
                          <p
                            className={`px-6 flex items-center gap-4 text-lg md:text-base underline font-medium text-black1 mb-6 mt-2 hover:text-blue cursor-pointer ${
                              content.contentId == contentId ? "text-blue" : ""
                            }`}
                            key={contentindex}
                            onClick={(e) => ChangeContent(content, item)}
                          >
                            {content.type === "Video" ? (
                              <>
                                <OndemandVideoIcon /> {content.contentName}
                              </>
                            ) : content.type === "Pdf" ? (
                              <>
                                <PictureAsPdfIcon />
                                {content.contentName}
                              </>
                            ) : null}
                          </p>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              ) : (
                ""
              )
            ) : null}
          </div>
          {isfeedbackgiven && (
            <div
              className="flex w-full mt-auto justify-center items-center cursor-pointer hover:text-blue"
              onClick={handleOpen}
            >
              Feedback
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col flex-1">
        {!open && (
          <div className="bg-blue w-full px-6 h-16 flex items-center">
            <DoubleArrowIcon
              style={{ color: "white" }}
              onClick={menuf}
              className="cursor-pointer md:hidden"
            />{" "}
          </div>
        )}

        <div className="flex-1">
          {contentondisplay && contentondisplay.contentName ? (
            <>
              {contentondisplay.type === "Video" ? (
                <div className="w-full flex justify-center h-full">
                  <video
                    style={{
                      width: "auto",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    controls
                  >
                    <source
                      src={contentondisplay.contentUrl}
                      type="video/mp4"
                    />
                    Your browser does not support the video
                  </video>
                </div>
              ) : contentondisplay.type === "Pdf" ? (
                <>
                  <iframe
                    src={contentondisplay.contentUrl}
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    frameBorder="0"
                  ></iframe>
                </>
              ) : null}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
