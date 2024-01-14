import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OtpProtected = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (user.email && !user.isVerified && !user.token) {
    return children;
  } else if (user.email && user.isVerified && user.token) {
    <Navigate to="/form" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default OtpProtected;
