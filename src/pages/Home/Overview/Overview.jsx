import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Overview() {
  const [viewmore, setviewmore] = useState(false);
  const clickviewmoref = () => {
    setviewmore(!viewmore);
  };
  return (
    <section
      id="overview"
      className="flex flex-col gap-16 md:gap-16 custom-width-88 py-24"
    >
      <div className="flex flex-col">
        <p
          className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
          style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
        >
          Company <span className="text-blue font-medium">Overview</span>
        </p>
        <p className="text-black3 text-lg font-medium md:text-center">
          Revealing the Spirit and Development of Our Organization
        </p>{" "}
      </div>
      <div className="flex md:flex-col justify-between md:gap-4">
        <img
          src="./assets/Images/Home/overview1.png"
          className="w-2/5 md:w-full object-cover rounded-xl"
        />
        <div className="flex flex-col gap-3 justify-center w-1/2 md:w-full">
          <p className="text-4xl md:text-3xl text-black1 font-medium">
            About Us
          </p>
          <p className="text-black3 text-2xl md:text-xl">
            At JRF Learning Spectrum, we prioritize JRF, fostering dynamic
            learning environments. Committed to excellence, we provide
            outstanding opportunities for academic, professional, and personal
            growth, ensuring individuals thrive in every aspect.
          </p>
        </div>
      </div>
      {!viewmore && (
        <button
          className="self-center text-blue text-lg font-medium"
          onClick={clickviewmoref}
        >
          know more
          <KeyboardArrowDownIcon style={{ color: "blue" }} />
        </button>
      )}
      {viewmore ? (
        <>
          <div className="flex md:flex-col-reverse justify-between md:gap-4">
            <div className="flex flex-col gap-3 justify-center w-1/2 md:w-full">
              <p className="text-4xl md:text-3xl text-black1 font-medium">
                Our Story{" "}
              </p>
              <p className="text-black3 text-2xl md:text-xl">
                No more the silent rows, where minds may drift, But a circle of
                learners, in collaboration, we uplift. For knowledge is not
                static, confined to a bookshelf, But a living, breathing entity,
                shaped by collective self.
              </p>
            </div>{" "}
            <img
              src="./assets/Images/Home/overview2.png"
              className="w-2/5 md:w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex md:flex-col justify-between md:gap-4">
            <img
              src="./assets/Images/Home/overview3.png"
              className="w-2/5 md:w-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-3 justify-center w-1/2 md:w-full">
              <p className="text-4xl md:text-3xl text-black1 font-medium">
                Background{" "}
              </p>
              <p className="text-black3 text-2xl md:text-xl">
                Embarking on JRF preparation revealed a gap in dedicated
                platforms. Recognizing the need, we've crafted a precise and
                insightful companion for JRF aspirants, offering tailored
                resources, guidance, and support for success.
              </p>
            </div>
          </div>
          <div className="flex md:flex-col-reverse justify-between md:gap-4">
            <div className="flex flex-col gap-3 justify-center w-1/2 md:w-full">
              <p className="text-4xl md:text-3xl text-black1 font-medium">
                Mission{" "}
              </p>
              <p className="text-black3 text-2xl md:text-xl">
                For JRF applicants, our mission is to focus on excellence,
                innovation, and holistic development. By highlighting the
                essence of the journey—nurturing a passion for research and
                knowledge—we hope to be catalysts for academic success.
              </p>
            </div>{" "}
            <img
              src="./assets/Images/Home/overview1.png"
              className="w-2/5 md:w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex md:flex-col justify-between md:gap-4">
            <img
              src="./assets/Images/Home/overview5.png"
              className="w-2/5 md:w-full object-cover rounded-xl"
            />
            <div className="flex flex-col gap-3 justify-center w-1/2 md:w-full">
              <p className="text-4xl md:text-3xl text-black1 font-medium">
                Vision{" "}
              </p>
              <p className="text-black3 text-2xl md:text-xl">
                Pursuing our inclusive vision, we cultivate a dynamic JRF
                community, promoting shared knowledge and continuous learning.
                Our platform is a virtual sanctuary, transforming aspirations
                into a journey of success and fostering intellectual growth
                beyond exams.
              </p>
            </div>
          </div>
          <button
            className="self-center text-blue text-lg font-medium"
            onClick={clickviewmoref}
          >
            know less
            <KeyboardArrowUpIcon style={{ color: "blue" }} />
          </button>
        </>
      ) : (
        ""
      )}
    </section>
  );
}
