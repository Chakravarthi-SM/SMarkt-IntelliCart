import React from "react";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";
const Home = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        <Carousel></Carousel>
        <Category></Category>
        <MidBanner></MidBanner>
        <Features></Features>
      </div>
    </>
  );
};

export default Home;
