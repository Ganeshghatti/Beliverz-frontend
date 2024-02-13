import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hero() {
  const user = useSelector((state) => state.user.user);

  return (
    <section
      id="hero"
      className="h-screen w-screen flex md:flex-col-reverse justify-center items-center md:h-auto md:py-12"
    >
      <div className="flex flex-col gap-4 w-1/2 md:w-11/12 pl-48 md:p-0  mt-16 md:mt-0 md:items-center">
        <p
          className="text-5xl md:text-3xl font-medium text-black2 md:text-center"
          style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
        >
          Conquer your
          <span className="text-blue font-bold">
            &nbsp; Goals ,<br />
          </span>
          Achieve Your <span className="text-blue font-bold">Dreams</span>
        </p>
        <p className="text-black3 text-lg md:text-center">
          Nurture Your Professional Aspirations with Us.
        </p>
        {!user.email && (
          <Link to="/login" className="w-fit">
            <button className="button-filled w-40 h-14 md:w-36 md:h-12">
              Join For Free
            </button>
          </Link>
        )}

        <div className="flex flex-col mt-4">
          <div className="flex">
            <p className="text-5xl md:text-4xl text-black2 font-semibold">
              28k+
            </p>
            <img src="./assets/Images/Home/HeroInstGroup.png" />
          </div>
          <p className="text-black3 text-lg font-normal">National Learners</p>
        </div>
      </div>
      <div className="w-1/2 md:w-11/12">
        {user.email ? (
          <img src="./assets/Images/Home/HeroAfterLogin.png" />
        ) : (
          <img src="./assets/Images/Home/HeroBeforeLogin.png"/>
        )}
      </div>
    </section>
  );
}
