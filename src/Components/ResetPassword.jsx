import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinnerf from "./Spinnerf";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
import { REACT_APP_BACK_URL } from "../config/config";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    let uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!uuidRegex.test(resetToken)) {
      window.location.href = "http://beliverzjrf.com/";
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.password !== formData.confirmPassword);
      if (formData.password !== formData.confirmPassword) {
        setAlert(
          <Alert
            style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
            variant="filled"
            severity="error"
          >
            Passwords Don't Match
          </Alert>
        );
        setTimeout(() => setAlert(null), 5000);
        return;
      }
      setLoading(true);

      const response = await axios.post(
        `${REACT_APP_BACK_URL}/user/reset-password/${resetToken}`,
        formData
      );
      setLoading(false);
      console.log(response);
        window.location.href = "http://beliverzjrf.com";
    } catch (error) {
      setLoading(false);
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
    }
  };

  return (
    <section
      className="w-screen h-screen flex justify-center"
      id="reset-password"
    >
      {loading && <Spinnerf />}
      <Stack spacing={2}>{alert}</Stack>
      <form className="rounded md:w-4/5 w-1/3 flex flex-col gap-5 px-14 justify-center bg-white md:py-12 md:px-6">
        <p className="text-[#5A81EE] text-center text-3xl font-semibold">
          Reset Password
        </p>

        <TextField
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          label="Email ID"
          onChange={handleChange}
          className="w-full rounded"
          required
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            className="w-full rounded"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            name="password"
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            className="w-full rounded"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        <button
          className="bg-blue border-1 border-solid border-blue text-white rounded w-full py-3 hero-hover-animated-button"
          type="submit"
          onClick={handleResetPassword}
        >
          Confirm
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
