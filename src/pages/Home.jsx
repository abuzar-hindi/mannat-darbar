import React from "react";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import Menu from "../components/Menu";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <Menu />
      <Gallery />
      <Reviews />
      <Contact />
      <NewsLetter />
    </div>
  );
};

export default Home;
