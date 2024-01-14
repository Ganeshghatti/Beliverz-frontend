import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen w-screen flex md:flex-col-reverse justify-center items-center md:h-auto md:py-12"
    >
      <div className="flex flex-col gap-4 w-1/2 md:w-11/12 pl-48 md:p-0  mt-16 md:mt-0 md:items-center">
        <p
          className="text-5xl md:text-4xl font-medium text-black2 md:text-center"
          style={{ letterSpacing: "-1.12px", lineHeight: "normal" }}
        >
          Welcome to <span className="text-blue font-bold">Beliverz</span>
          <br className="md:hidden" /> Learning Spectrum
        </p>
        <p className="text-black3 text-lg md:text-center">
          Nurture Your Professional Aspirations with Us. Conquer JRF, Achieve
          Your Dreams!
        </p>
        <Link to="/login" className="w-fit">
          <button className="button-filled w-40 h-14 md:w-36 md:h-12">Join For Free</button>
        </Link>
        <div className="flex flex-col mt-4">
          <div className="flex">
            <p className="text-5xl md:text-4xl text-black2 font-semibold">
              28k+
            </p>
            <img src="./assets/Images/Home/HeroInstGroup.png" />
          </div>
          <p className="text-black3 text-lg font-normal">Worldwide Learners</p>
        </div>
      </div>
      <div className="w-1/2 md:w-11/12">
        <img src="./assets/Images/Home/Hero.png" />
      </div>
    </section>
  );
}