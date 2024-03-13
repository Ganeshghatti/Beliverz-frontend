import React, { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_BACK_URL } from "../../config/config";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import Spinnerf from "../../Components/Spinnerf";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Countdown from "react-countdown";

function Testseriespage() {
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const { testseriesId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (testseriesId && user.email) {
          setLoading(true);
          const response = await axios.get(
            `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}/${user.email}/test`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          if (response.data.redirectToResults) {
            navigate(`/testseries/${testseriesId}/${user.email}/results`);
            return;
          }

          setTestData(response.data.testseries);
          setCurrentQuestion(0);
          setSelectedOptions(
            Array(response.data.testseries.questions.length).fill(null)
          );
          const savedTimer = localStorage.getItem("timeAvailable");
          setTimer(
            response.data.timeAvailable
          );
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 302) {
          navigate(`/testseries/${testseriesId}/${user.email}/results`);
        } else {
          setLoading(false);
          setAlert(
            <Alert
              style={{
                position: "fixed",
                bottom: "3%",
                left: "2%",
                zIndex: 999,
              }}
              variant="filled"
              severity="error"
            >
              {error.response.data.error}
            </Alert>
          );
          setTimeout(() => setAlert(null), 5000);
        }
      }
    };

    fetchData();
  }, [testseriesId, user.email, user.token, navigate]);

  useEffect(() => {
    console.log(timer);
  }, [timer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => Math.max(0, prevTimer - 1));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures it runs only once
  
  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === testData.questions.length - 1) {
      if (selectedOptions.includes(null)) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="warning"
          >
            Please answer all questions.
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        return;
      }
      setLoading(true);
      console.log("handleoptions is causing error");
      submittest();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const submittest = async () => {
    const response = await axios.post(
      `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}/${user.email}/submit`,
      { selectedOptions },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    navigate(`/testseries/${testseriesId}/${user.email}/results`);
  };

  const handleCountdownComplete = () => {
    console.log("Timer is causing error");
    submittest();
  };
  useEffect(() => {
    localStorage.setItem("timeAvailable", timer);
  }, [timer]);

  return loading ? (
    <>
      <Spinnerf />
      <div className="h-screen w-screen block" />
    </>
  ) : (
    <div
      className="Testseriespage flex flex-col bg-[#EDEBF2] w-screen h-screen items-center justify-center"
      id="Testseriespage"
    >
      <Stack spacing={2}>{alert}</Stack>

      {testData && testData.testseriesName && testData.questions.length > 0 ? (
        <div className="flex flex-col gap-8 w-1/2 md:w-11/12 bg-white p-12 rounded items-center">
          <Avatar style={{ backgroundColor: "#5A81EE", padding: "30px" }}>
            {currentQuestion + 1}/{testData.questions.length}
          </Avatar>
          <Countdown
            date={Date.now() + timer * 1000}
            onComplete={handleCountdownComplete}
            renderer={({ minutes, seconds, completed }) => {
              if (completed) {
                handleCountdownComplete();
              } else {
                return (
                  <span>
                    {minutes}:{seconds}
                  </span>
                );
              }
            }}
          />

          <p>{testData.questions[currentQuestion].questionText}</p>
          <ul className="flex flex-col gap-2">
            {testData.questions[currentQuestion].options.map(
              (option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={selectedOptions[currentQuestion] === index}
                      onChange={() => handleOptionSelect(index)}
                    />
                    {option.optionText}
                  </label>
                </li>
              )
            )}
          </ul>
          <div className="flex gap-4">
            <button onClick={handleBack} className="button-filled">
              Back
            </button>
            <button onClick={handleNextQuestion} className="button-filled">
              {currentQuestion === testData.questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <Spinnerf />
      )}
    </div>
  );
}

export default Testseriespage;
