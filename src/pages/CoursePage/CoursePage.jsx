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
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function CoursePage() {
  const [loading, setLoading] = useState(false);
  const [chapterslist, setchapterslist] = useState();
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [alert, setAlert] = useState(null);
  const [open, setopen] = useState(false);
  const [contentondisplay, setcontentondisplay] = useState();
  const { courseId, email, chapterId, contentId } = useParams();

  const storedcoursedata = localStorage.getItem(`${courseId}`);
  const contentdata = JSON.parse(storedcoursedata);

  const menuf = () => {
    setopen(!open);
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.token) {
          setLoading(true);
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}/get-chapters-list`,
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
        if (user.token != null) {
          setLoading(true);
          console.log(user.token);
          const response = await axios.get(
            `https://beliverz-user-server.vercel.app/user/courses/${courseId}/${email}/${chapterId}/${contentId}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          localStorage.setItem(
            `${response.data.currentlywatching.courseId}`,
            JSON.stringify({
              courseId: response.data.currentlywatching.courseId,
              chapterId: response.data.currentlywatching.chapterId,
              contentId: response.data.currentlywatching.contentId,
            })
          );
          console.log(response.data.content);
          setcontentondisplay(response.data.content);
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
            {error.response?.data || "An error occurred"}
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        setLoading(false);
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

      {open && (
        <div className="overflow-y-auto md:absolute top-0 left-0 h-screen w-96 md:w-full flex flex-col justify-start">
          <div className="py-10 w-full bg-blue px-4 flex items-center justify-between">
            <div className="md:hidden"/>
            <DoubleArrowIcon
              style={{ color: "white" }}
              onClick={menuf}
              className="cursor-pointer"
            />
          </div>
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
              <Spinnerf />
            )
          ) : null}
        </div>
      )}
      <div className="flex flex-col flex-1">
        <div className="bg-blue w-full px-6 py-8 flex items-center">
          {!open && (
            <DoubleArrowIcon
              style={{ color: "white" }}
              onClick={menuf}
              className="cursor-pointer md:hidden"
            />
          )}
        </div>

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
                    width="auto"
                    height="100%"
                    objectFit="contain"
                    frameBorder="0"
                  ></iframe>
                </>
              ) : null}
            </>
          ) : (
            <Spinnerf />
          )}
        </div>
      </div>
    </section>
  );
}
