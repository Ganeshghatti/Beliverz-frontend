import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Spinnerf from "../../../Components/Spinnerf";
import Facebook from "./Icons/Facebook.png";
import Instagram from "./Icons/Instagram.png";
import Twitter from "./Icons/Twitter.png";
import LinkedIn from "./Icons/LinkedIn.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("https://beliverz-server.vercel.app/user/form", formData);
      console.log(response);
      setAlert(
        <Alert
          style={{ position: "fixed", bottom: "3%", left: "2%", zIndex: 999 }}
          variant="filled"
          severity="success"
        >
          {response.data.message}
        </Alert>
      );
      setTimeout(() => setAlert(null), 5000);
      setFormData({email:"",name:"",phone:"",query:""})
      setLoading(false);
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

  return (
    <section
      id="contact"
      className="flex flex-col w-full py-24 items-center justify-center"
    >
      {loading && <Spinnerf />}
      <Stack spacing={2}>{alert}</Stack>
      <div className="custom-width-88 flex md:flex-col md:w-11/12 md:gap-8">
        <div className="flex w-1/2 md:w-full flex-col justify-between md:items-center">
          <div className="flex flex-col gap-4">
            <p
              className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
              style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
            >
              Get in <span className="text-blue font-medium">Touch</span>
            </p>
            <p className="text-lg text-black3 md:text-base md:text-center">
              Our Team will reach out to you as soon as possible
            </p>
          </div>
          <div className="w-full flex flex-wrap justify-around items-center gap-y-24">
            <div className="w-1/2 flex flex-col gap-2 md:items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="bg-blue w-8 h-8 rounded-full p-5"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="m-auto"
                  >
                    <path
                      d="M20.21 8.82003L14 2.78003C13.474 2.27988 12.7759 2.00098 12.05 2.00098C11.3241 2.00098 10.626 2.27988 10.1 2.78003L3.89 8.78003C3.61408 9.02089 3.39216 9.31733 3.23879 9.64993C3.08541 9.98253 3.00404 10.3438 3 10.71V19.29C3.01054 20.0176 3.30904 20.7114 3.83012 21.2194C4.35119 21.7273 5.05235 22.008 5.78 22H18.22C18.9476 22.008 19.6488 21.7273 20.1699 21.2194C20.691 20.7114 20.9895 20.0176 21 19.29V10.71C20.9992 10.3585 20.929 10.0106 20.7935 9.68625C20.6579 9.36191 20.4596 9.06754 20.21 8.82003ZM11.44 4.22003C11.593 4.08019 11.7927 4.00264 12 4.00264C12.2073 4.00264 12.407 4.08019 12.56 4.22003L18 9.50003L12.53 14.78C12.377 14.9199 12.1773 14.9974 11.97 14.9974C11.7627 14.9974 11.563 14.9199 11.41 14.78L6 9.50003L11.44 4.22003ZM19 19.29C18.9871 19.4863 18.8987 19.67 18.7532 19.8024C18.6078 19.9348 18.4166 20.0056 18.22 20H5.78C5.58338 20.0056 5.39225 19.9348 5.24678 19.8024C5.10132 19.67 5.01286 19.4863 5 19.29V11.35L9.05 15.25L7.39 16.85C7.20375 17.0374 7.09921 17.2908 7.09921 17.555C7.09921 17.8192 7.20375 18.0727 7.39 18.26C7.48295 18.3575 7.59463 18.4352 7.71836 18.4885C7.84208 18.5418 7.9753 18.5695 8.11 18.57C8.36747 18.569 8.61462 18.4687 8.8 18.29L10.57 16.59C11.0096 16.8587 11.5148 17.0008 12.03 17.0008C12.5452 17.0008 13.0504 16.8587 13.49 16.59L15.26 18.29C15.4454 18.4687 15.6925 18.569 15.95 18.57C16.0847 18.5695 16.2179 18.5418 16.3416 18.4885C16.4654 18.4352 16.5771 18.3575 16.67 18.26C16.8563 18.0727 16.9608 17.8192 16.9608 17.555C16.9608 17.2908 16.8563 17.0374 16.67 16.85L15 15.25L19 11.35V19.29Z"
                      fill="#F0FDF4"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-xl md:text-lg font-medium">Email</p>
              <a href="mailto:contact@beliverz.com" className="text-base md:text-sm">contact@beliverz.com</a>
            </div>
            <div className="w-1/2 flex flex-col gap-2 md:items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="bg-blue w-8 h-8 rounded-full p-5"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.4099 13C19.1899 13 18.9599 12.93 18.7399 12.88C18.2948 12.7805 17.857 12.6501 17.4299 12.49C16.966 12.3212 16.4561 12.33 15.9982 12.5146C15.5404 12.6992 15.167 13.0466 14.9499 13.49L14.7299 13.95C13.7587 13.3992 12.8616 12.7271 12.0599 11.95C11.2828 11.1484 10.6107 10.2512 10.0599 9.28L10.5199 9.07C10.9633 8.85292 11.3107 8.47953 11.4953 8.02169C11.6799 7.56385 11.6887 7.05391 11.5199 6.59C11.3611 6.15903 11.2308 5.71808 11.1299 5.27C11.0799 5.05 11.0399 4.82 11.0099 4.6C10.8885 3.89562 10.5196 3.25774 9.96955 2.80124C9.41955 2.34474 8.72462 2.09961 8.00993 2.11H4.99993C4.57717 2.10945 4.15908 2.19825 3.77305 2.37058C3.38701 2.54292 3.04176 2.7949 2.75993 3.11C2.47225 3.43365 2.25804 3.81575 2.13203 4.23004C2.00602 4.64432 1.97119 5.08098 2.02993 5.51C2.57352 9.67214 4.47514 13.5387 7.43993 16.51C10.4113 19.4748 14.2778 21.3764 18.4399 21.92C18.5697 21.9299 18.7001 21.9299 18.8299 21.92C19.5673 21.9211 20.2793 21.6505 20.8299 21.16C21.145 20.8782 21.397 20.5329 21.5693 20.1469C21.7417 19.7609 21.8305 19.3428 21.8299 18.92V15.92C21.8245 15.229 21.5808 14.5611 21.1399 14.0291C20.6989 13.4971 20.0879 13.1336 19.4099 13ZM19.8999 19C19.8996 19.1395 19.8701 19.2775 19.8132 19.4049C19.7564 19.5324 19.6735 19.6465 19.5699 19.74C19.4603 19.8399 19.3299 19.9141 19.1881 19.9573C19.0463 20.0006 18.8966 20.0117 18.7499 19.99C15.0182 19.5026 11.5502 17.802 8.87993 15.15C6.2074 12.4775 4.49196 8.99737 3.99993 5.25C3.9782 5.10333 3.98936 4.95367 4.0326 4.81185C4.07584 4.67003 4.15007 4.5396 4.24993 4.43C4.34455 4.32515 4.46031 4.24154 4.58958 4.18466C4.71885 4.12778 4.8587 4.09892 4.99993 4.1H7.99993C8.23109 4.09435 8.45707 4.16898 8.63939 4.3112C8.82172 4.45341 8.94913 4.65442 8.99993 4.88C8.99993 5.15 9.08993 5.43 9.14993 5.7C9.2655 6.22386 9.41925 6.73857 9.60993 7.24L8.20993 7.9C7.96929 8.01046 7.78229 8.21185 7.68993 8.46C7.58991 8.70346 7.58991 8.97654 7.68993 9.22C9.12913 12.3028 11.6072 14.7808 14.6899 16.22C14.9334 16.32 15.2065 16.32 15.4499 16.22C15.6981 16.1276 15.8995 15.9406 16.0099 15.7L16.6399 14.3C17.1558 14.4881 17.6837 14.6418 18.2199 14.76C18.4799 14.82 18.7599 14.87 19.0299 14.91C19.2555 14.9608 19.4565 15.0882 19.5987 15.2705C19.7409 15.4529 19.8156 15.6788 19.8099 15.91L19.8999 19ZM13.9999 2C13.7699 2 13.5299 2 13.2999 2C13.0347 2.02254 12.7893 2.14952 12.6177 2.353C12.4461 2.55647 12.3624 2.81978 12.3849 3.085C12.4075 3.35022 12.5344 3.59562 12.7379 3.76721C12.9414 3.93881 13.2047 4.02254 13.4699 4H13.9999C15.5912 4 17.1174 4.63214 18.2426 5.75736C19.3678 6.88258 19.9999 8.4087 19.9999 10C19.9999 10.18 19.9999 10.35 19.9999 10.53C19.9778 10.7938 20.0611 11.0556 20.2317 11.2581C20.4023 11.4606 20.6462 11.5871 20.9099 11.61H20.9899C21.2403 11.611 21.4819 11.5181 21.667 11.3496C21.8522 11.1811 21.9674 10.9493 21.9899 10.7C21.9899 10.47 21.9899 10.23 21.9899 10C21.9899 7.88 21.1484 5.84668 19.6503 4.34668C18.1522 2.84667 16.1199 2.00265 13.9999 2ZM15.9999 10C15.9999 10.2652 16.1053 10.5196 16.2928 10.7071C16.4804 10.8946 16.7347 11 16.9999 11C17.2651 11 17.5195 10.8946 17.707 10.7071C17.8946 10.5196 17.9999 10.2652 17.9999 10C17.9999 8.93913 17.5785 7.92172 16.8284 7.17157C16.0782 6.42143 15.0608 6 13.9999 6C13.7347 6 13.4804 6.10536 13.2928 6.29289C13.1053 6.48043 12.9999 6.73478 12.9999 7C12.9999 7.26522 13.1053 7.51957 13.2928 7.70711C13.4804 7.89464 13.7347 8 13.9999 8C14.5304 8 15.0391 8.21071 15.4141 8.58579C15.7892 8.96086 15.9999 9.46957 15.9999 10Z"
                      fill="#F0FDF4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl md:text-lg font-medium">Phone</p>
              <a href="tel:+91 999999999" className="text-base md:text-sm">+91 999999999</a>
            </div>
            <div className="w-1/2 flex flex-col gap-2 md:items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="bg-blue w-8 h-8 rounded-full p-5"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.9999 4.4804C16.4086 2.8891 14.2504 1.99512 11.9999 1.99512C9.74949 1.99512 7.59123 2.8891 5.99993 4.4804C4.40863 6.0717 3.51465 8.22996 3.51465 10.4804C3.51465 12.7308 4.40863 14.8891 5.99993 16.4804L11.2699 21.7604C11.3629 21.8541 11.4735 21.9285 11.5954 21.9793C11.7172 22.0301 11.8479 22.0562 11.9799 22.0562C12.1119 22.0562 12.2426 22.0301 12.3645 21.9793C12.4864 21.9285 12.597 21.8541 12.6899 21.7604L17.9999 16.4304C19.5846 14.8457 20.4748 12.6965 20.4748 10.4554C20.4748 8.21434 19.5846 6.06508 17.9999 4.4804ZM16.5699 15.0004L11.9999 19.5904L7.42993 15.0004C6.52707 14.0967 5.91241 12.9456 5.66362 11.6927C5.41484 10.4397 5.54312 9.14115 6.03223 7.96108C6.52135 6.78101 7.34935 5.77245 8.41156 5.06288C9.47377 4.3533 10.7225 3.97458 11.9999 3.97458C13.2773 3.97458 14.5261 4.3533 15.5883 5.06288C16.6505 5.77245 17.4785 6.78101 17.9676 7.96108C18.4567 9.14115 18.585 10.4397 18.3362 11.6927C18.0875 12.9456 17.4728 14.0967 16.5699 15.0004ZM8.99993 7.4104C8.19264 8.22017 7.73932 9.31697 7.73932 10.4604C7.73932 11.6038 8.19264 12.7006 8.99993 13.5104C9.59969 14.1112 10.3635 14.5215 11.1956 14.6898C12.0276 14.8581 12.8909 14.777 13.677 14.4566C14.4631 14.1361 15.1371 13.5907 15.6144 12.8886C16.0917 12.1866 16.3511 11.3593 16.3599 10.5104C16.3644 9.9436 16.2553 9.38166 16.0388 8.85779C15.8224 8.33392 15.5032 7.85875 15.0999 7.4604C14.7036 7.05498 14.231 6.73194 13.7094 6.50986C13.1877 6.28779 12.6273 6.17107 12.0603 6.16643C11.4934 6.16178 10.9311 6.2693 10.4059 6.48279C9.88067 6.69628 9.40285 7.01153 8.99993 7.4104ZM13.6899 12.0904C13.311 12.4751 12.8101 12.7163 12.2731 12.7727C11.736 12.829 11.196 12.697 10.7454 12.3993C10.2949 12.1016 9.96173 11.6566 9.80294 11.1405C9.64415 10.6243 9.66958 10.069 9.87489 9.56955C10.0802 9.07007 10.4526 8.65741 10.9285 8.40213C11.4044 8.14686 11.9542 8.06481 12.4839 8.17002C13.0135 8.27522 13.4902 8.56116 13.8324 8.97893C14.1746 9.3967 14.3611 9.92037 14.3599 10.4604C14.3454 11.0777 14.0864 11.6639 13.6399 12.0904H13.6899Z"
                      fill="#F0FDF4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl md:text-lg font-medium">Office</p>
              <a href="mailto:contact@beliverz.com" className="text-base md:text-sm">contact@beliverz.com</a>
            </div>
            <div className="w-1/2 flex flex-col gap-2 md:items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="bg-blue w-8 h-8 rounded-full p-5"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM8 20H4V16H8V20ZM8 14H4V10H8V14ZM8 8H4V4H8V8ZM14 20H10V16H14V20ZM14 14H10V10H14V14ZM14 8H10V4H14V8ZM20 20H16V16H20V20ZM20 14H16V10H20V14ZM20 8H16V4H20V8Z"
                      fill="#F0FDF4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl md:text-lg font-medium">Socials</p>
              <div className="flex gap-2">
                <a href="">
                  <img src={Facebook} />
                </a>
                <a href="">
                  <img src={Instagram} />
                </a>
                <a href="">
                  <img src={Twitter} />
                </a>
                <a href="">
                  <img src={LinkedIn} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="custom-width-45 md:w-full flex flex-col gap-6 px-14 py-20 md:px-4 md:py-10"
          style={{ border: "1px solid #5A81EE", borderRadius: "25px" }}
        >
          <div className="flex md:flex-col justify-between items-center">
            <label className="flex flex-col custom-width-45 md:w-full">
              <p className="text-black2 font-medium text-lg">Name:</p>
              <TextField
                variant="outlined"
                placeholder="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </label>

            <label className="flex flex-col custom-width-45 md:w-full">
              <p className="text-black2 font-medium text-lg">Phone:</p>
              <TextField
                type="tel"
                name="phone"
                variant="outlined"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </label>
          </div>
          <label className="w-full">
            <p className="text-black2 font-medium text-lg">Email:</p>
            <TextField
              variant="outlined"
              placeholder="Email ID"
              type="email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            <p className="text-black2 font-medium text-lg">Message:</p>
            <textarea
              className="w-full p-2 rounded"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Your Querry in Brief"
            />
          </label>

          <button className="button-filled w-full py-2">Submit</button>
        </form>
      </div>
    </section>
  );
}
