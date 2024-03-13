import React, { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_BACK_URL } from "../../config/config";
import { Navigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import Spinnerf from "../../Components/Spinnerf";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function TestSeriesResults() {
  const [testData, setTestData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const { testseriesId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (testseriesId && user.email) {
          setLoading(true);
          const response = await axios.get(
            `${REACT_APP_BACK_URL}/user/testseries/${testseriesId}/${user.email}/results`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          console.log(response.data);
          setTestData(response.data.testseries);
          setSelectedOptions(response.data.selectedOptions);
          setResults(response.data.result);
          setLoading(false);
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

    fetchData();
  }, [testseriesId, user.email, user.token]);

  const backhomef=()=>{
    navigate('/')
  }
  return loading ? (
    <>
      <Spinnerf />
      <div className="h-screen w-screen block" />
    </>
  ) : (
    <section
      id="TestSeriesResults"
      className="Testseriespage flex flex-col bg-[#EDEBF2] w-screen h-auto items-center justify-center"
    >
      <Stack spacing={2}>{alert}</Stack>
      <div className="flex absolute top-5 left-5 items-center cursor-pointer" onClick={backhomef}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
  <path d="M0.61336 5.65792L5.32142 0.949854C5.47631 0.796781 5.6853 0.710937 5.90307 0.710937C6.12084 0.710937 6.32983 0.796781 6.48472 0.949854C6.80298 1.26811 6.80298 1.79489 6.48472 2.11315L3.18139 5.41648L14.3644 5.41648C14.8144 5.41648 15.1875 5.78961 15.1875 6.23956C15.1875 6.68952 14.8144 7.06265 14.3644 7.06265L3.18139 7.06265L6.48472 10.366C6.80298 10.6842 6.80298 11.211 6.48472 11.5293C6.3201 11.6939 6.11159 11.7707 5.90307 11.7707C5.69456 11.7707 5.48604 11.6939 5.32142 11.5293L0.61336 6.82121C0.459222 6.66688 0.372646 6.45768 0.372646 6.23956C0.372646 6.02144 0.459222 5.81224 0.61336 5.65792Z" fill="black"/>
</svg>HOME</div>
      <div className="flex flex-col gap-8 w-1/2 md:w-11/12 bg-white p-12 rounded">
        {testData && testData.questions.length > 0 && (
          <Avatar style={{ backgroundColor: "#5A81EE", padding: "30px" }}>
            {results}/{testData.questions.length}
          </Avatar>
        )}
        {testData &&
          testData.questions.map((question, index) => (
            <div key={index} className="question-container">
              <p>
                {index + 1}.{question.questionText}
              </p>
              <ul className="flex flex-col gap-2">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input type="radio" disabled />
                      <span className="text-gray-700">{option.optionText}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {question.options.map((option, optionIndex) => (
                <>
                  {option.isCorrect == true && (
                    <p className="text-[#13FF6A] font-semibold">
                      Correct Answer {option.optionText}
                    </p>
                  )}
                </>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
