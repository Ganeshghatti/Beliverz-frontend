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
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar/>
      <Hero />
      {/* <Numbers /> */}
      <Courses />
      <Overview />
      <Category />
      <WhyUs />
      <BLS />
      <Contact />
      <Footer/>
    </div>
  );
}
