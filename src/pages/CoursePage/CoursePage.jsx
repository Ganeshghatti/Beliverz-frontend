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
import Avatar from "@mui/joy/Avatar";
import AccordionGroup from "@mui/joy/AccordionGroup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const defaultTheme = createTheme();

const drawerWidth = 325;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function CoursePage() {
  const [loading, setLoading] = useState(false);
  const [chapterslist, setchapterslist] = useState();
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState(null);
  const [contentondisplay, setcontentondisplay] = useState();
  const { courseId, email, chapterId, contentId } = useParams();

  const storedcoursedata = localStorage.getItem(`${courseId}`);
  const contentdata = JSON.parse(storedcoursedata);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const toggleDrawer = () => {
    setOpen(!open);
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
        if (user.token !== null) {
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
    <section id="CoursePage" className="flex w-screen h-screen">
      <Stack spacing={2}>{alert}</Stack>

      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <List component="nav" className="overflow-auto h-screen">
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
                          <p
                            className={` text-2xl md:text-xl font-semibold ${
                              expandedPanel === `panel${index}-`
                                ? "text-blue"
                                : "text-black"
                            }`}
                          >
                            {index + 1} . {item.chapterName}
                          </p>
                        </AccordionSummary>
                        <AccordionDetails>
                          {item.content.map((content, contentindex) => (
                            <div
                              key={contentindex}
                              onClick={(e) => ChangeContent(content, item)}
                            >
                              {content.contentName}
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                ) : (
                  <Spinnerf />
                )
              ) : null}
            </List>
          </Drawer>
        </Box>
      </ThemeProvider>
      <div className="flex flex-wrap md:flex-col justify-between gap-8 flex-1 h-screen md:items-center">
        {contentondisplay && contentondisplay.contentName ? (
          <>
            {contentondisplay.type === "Video" ? (
              <>
                <video
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  controls
                >
                  <source src={contentondisplay.contentUrl} type="video/mp4" />
                  Your browser does not support the video
                </video>
              </>
            ) : contentondisplay.type === "Pdf" ? (
              <>
                <iframe
                  src={contentondisplay.contentUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              </>
            ) : null}
          </>
        ) : (
          <Spinnerf />
        )}
      </div>
    </section>
  );
}
