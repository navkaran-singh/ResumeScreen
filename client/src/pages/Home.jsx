import React from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="m-3 overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <HeroSection />
      <Features />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Home;
