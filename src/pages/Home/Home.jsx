import React from "react";
import "./Home.scss";
import Hero from "./Hero/Hero";
import Numbers from "./Numbers/Numbers";
import Category from "./Category/Category";
import Overview from "./Overview/Overview";
import Courses from "./Courses/Courses";
import WhyUs from "./WhyUs/WhyUs";
import BLS from "./BLS/BLS";
import Contact from "./Contact/Contact";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <Numbers />
      <Category />
      <Overview />
      <Courses />
      <WhyUs />
      <BLS />
      <Contact />
    </div>
  );
}
