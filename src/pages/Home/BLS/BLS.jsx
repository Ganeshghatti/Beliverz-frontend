import React from "react";
import BLSdesignpc from "./BLSdesignpc.png";

export default function BLS() {
  const downloadPDF = (parameter) => {
    const pdfUrl = `./assets/pdf/${parameter}.pdf`;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = `${parameter}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section
      id="BLS"
      className="flex flex-col gap-2 md:gap-6 w-full py-24 items-center md:py-8"
    >
      <p
        className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
        style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
      >
        Learning Courses <span className="text-blue font-medium">online</span>{" "}
      </p>
      <p className="text-black3 text-lg font-medium md:text-center">
        Believerz Learning: Elevate JRF/AIR success with tailored strategic
        preparation.
      </p>
      <div className="w-11/12 flex mt-20 md:mt-0 BLS-content-div md:flex-col-reverse">
        <div className="flex flex-col justify-around pt-20 md:pt-0 custom-width-45 items-end md:w-full md:items-center">
          <div className="flex flex-col md:items-center gap-4 p-8 BLS-card rounded-xl w-11/12 md:w-full md:p-4">
            <p className="text-black1 text-2xl md:text-lg font-medium md:text-center">
              Homescience
            </p>
            <p className="text-[#586174] text-sm font-normal md:text-center">
              our platform becomes your comprehensive resource. We offer an
              all-encompassing course that thoroughly covers your JRF syllabus,
              addressing crucial topics such as Food and Nutrition, Clothing and
              Textiles, and Child Development. Our commitment is to equip you
              with the knowledge and skills necessary to excel in this domain.
            </p>
            <div className="w-full gap-4 flex md:items-center mt-4 md:mt-0 md:justify-around">
              <button
                onClick={() => downloadPDF("paper1_hindi")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in Hindi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>{" "}
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Demo papers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:items-center gap-4 p-8 BLS-card rounded-xl w-11/12 md:w-full md:p-4">
            <p className="text-black1 text-2xl md:text-lg font-medium md:text-center">
              Music
            </p>
            <p className="text-[#586174] text-sm font-normal md:text-center">
              In the realm of Management, our platform is your guide to
              mastering the JRF syllabus. Our comprehensive course covers
              Entrepreneurship, Marketing, and other vital topics. We are
              committed to offering the knowledge and insights that will empower
              you to excel in this specialized field.
            </p>
            <div className="w-full gap-4 flex md:items-center mt-4 md:mt-0 md:justify-around">
              <button
                onClick={() => downloadPDF("paper1_hindi")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in Hindi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Demo papers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <img src={BLSdesignpc} className="md:hidden h-4/5" />
        <div className="flex flex-col justify-between custom-width-45 items-start md:w-full">
          <div className="flex flex-col md:items-center gap-4 p-8 BLS-card rounded-xl w-11/12 md:w-full md:p-4">
            <p className="text-black1 text-2xl md:text-lg font-medium md:text-center">
              Comprehensive JRF Paper 1 Course
            </p>
            <p className="text-[#586174] text-sm font-normal md:text-center">
              Our meticulously crafted Paper 1 complete course aligns seamlessly
              with your JRF Syllabus. It delves into critical thinking,
              analytical skills, and comprehensive general knowledge, providing
              a holistic approach to enhance your awareness. The course
              integrates simplified techniques for mastering Mathematics and
              logical reasoning, ensuring a thorough preparation.
            </p>
            <div className="w-full gap-4 flex md:items-center mt-4 md:mt-0 md:justify-around">
              <button
                onClick={() => downloadPDF("paper1_hindi")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in Hindi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Demo papers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>{" "}
          <div className="flex flex-col md:items-center gap-4 p-8 BLS-card rounded-xl w-11/12 md:w-full md:p-4">
            <p className="text-black1 text-2xl md:text-lg font-medium md:text-center">
              Commerce
            </p>
            <p className="text-[#586174] text-sm font-normal md:text-center">
              Navigating the complexities of economics in preparation for your
              JRF is made seamless through our dedicated platform. Our
              comprehensive course covers microeconomics, macroeconomics,
              international economics, public economics, development economics
              etc. we provide the resources and support you need to confidently
              tackle every facet of the economics syllabus.
            </p>
            <div className="w-full gap-4 flex md:items-center mt-4 md:mt-0 md:justify-around">
              <button
                onClick={() => downloadPDF("paper1_hindi")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in Hindi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Demo papers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>{" "}
          <div className="flex flex-col md:items-center gap-4 p-8 BLS-card rounded-xl w-11/12 md:w-full md:p-4">
            <p className="text-black1 text-2xl md:text-lg font-medium md:text-center">
              Upcoming
            </p>
            <p className="text-[#586174] text-sm font-normal md:text-center">
              For those pursuing JRF in Law, our platform serves as your
              comprehensive source. Our course spans all legal topics and
              principles integral to the JRF syllabus. We provide a focused and
              detailed examination of the subject, ensuring that you are
              thoroughly prepared for success.
            </p>
            <div className="w-full gap-4 flex md:items-center mt-4 md:mt-0 md:justify-around">
              <button
                onClick={() => downloadPDF("paper1_hindi")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in Hindi</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Syllabus in English</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => downloadPDF("paper1_english")}
                className="BLS-button"
              >
                <span className="text-sm md:text-xs">Demo papers</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M7.22872 9.71961L4.40687 6.89776C4.31512 6.80492 4.26367 6.67966 4.26367 6.54914C4.26367 6.41862 4.31512 6.29336 4.40687 6.20052C4.59762 6.00977 4.91336 6.00977 5.10411 6.20052L7.08401 8.18042V1.47771C7.08401 1.20802 7.30765 0.984375 7.57734 0.984375C7.84703 0.984375 8.07067 1.20802 8.07067 1.47771V8.18042L10.0506 6.20052C10.2413 6.00977 10.5571 6.00977 10.7478 6.20052C10.8465 6.29919 10.8925 6.42416 10.8925 6.54914C10.8925 6.67412 10.8465 6.7991 10.7478 6.89776L7.92596 9.71961C7.83346 9.812 7.70807 9.86389 7.57734 9.86389C7.44661 9.86389 7.32122 9.812 7.22872 9.71961Z"
                    fill="white"
                  />
                  <path
                    d="M1 8.71094V11.2646C1 11.6707 1.32914 11.9998 1.73516 11.9998H12.7625C13.1686 11.9998 13.4977 11.6707 13.4977 11.2646V8.71094"
                    stroke="white"
                    stroke-width="0.882191"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
