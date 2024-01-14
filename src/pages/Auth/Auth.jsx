import React, { useState } from "react";
import axios from "axios";
import { saveuser, logout } from "../../features/User";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinnerf from "../../Components/Spinnerf";
import "./Auth.css";
import OtpInput from "react-otp-input";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function Auth() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/auth", {
          otp: parseInt(otp),
          email: user.email,
          username: user.username,
        });
        console.log(response);
        const newuser = {
          email: response.data.email,
          username: response.data.username,
          token: response.data.jwttoken,
          isVerified: response.data.isVerified,
        };
        localStorage.setItem("user", JSON.stringify(newuser));
        dispatch(
          saveuser({
            email: newuser.email,
            token: newuser.token,
            username: newuser.username,
            isVerified: newuser.isVerified,
          })
        );
        navigate(`/form`);
        setLoading(false);
      } catch (error) {
        console.log(error)
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
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen">
      {loading && <Spinnerf />}
      <Stack spacing={2}>{alert}</Stack>
      <div
        className="flex flex-col gap-8 p-12 rounded md:p-4 otp-div"
        style={{ border: "0.5px solid #1f20ae" }}
      >
        <p className="font-normal text-base md:text-sm">
          You're almost done!
          <br /> We sent a code to{" "}
          <span className="font-semibold text-navyblue">
            {user ? user.email : "email"}
          </span>
        </p>
        <div className="otp-4inputdiv">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            isInputNum
            inputType="number"
            renderSeparator={<span> </span>}
            renderInput={(props) => (
              <input
                {...props}
                className="border-1 border-gray2 border-solid w-36 text-black auth-input"
                placeholder="0"
              />
            )}
            shouldAutoFocus={true}
          />
        </div>
        <button
          type="submit"
          className="bg-navyblue border-1 border-solid border-navyblue text-white rounded flex items-center px-4 py-2 text-center justify-center mt-7"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
