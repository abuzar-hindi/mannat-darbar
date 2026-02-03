import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="relative bg-cover bg-center" style={{ background: "url(/images/bg-hero.jpg) norepeat center center/cover", backgroundColor: "#0F172B" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center sm:text-left text-white mb-6 text-xs lg:text-sm">
          <span className="inline-block rounded-full bg-orange-50 text-orange-500 px-3 py-1 font-medium">Open: 11:00 AM — 11:30 PM</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-white">
              Welcome to
              <br />
              <span className="text-[#FEA116] tracking-wider">MANNAT DARBAAR</span>
            </h1>

            <p className="text-gray-200 max-w-xl">
              Where Restaurant & Cafe merge under one roof — exceptional service and carefully crafted dishes for every occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
              <Link to="/orderanddine" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow hover:from-orange-500 hover:to-orange-600 transition">Order / Pick-up</button>
              </Link>

              <Link to="/reserve-table" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow-sm hover:shadow-md transition">Reserve a Table</button>
              </Link>
            </div>

            <div className="flex gap-3 items-center mt-4">
              <a href="tel:+919236359327" className="inline-block px-4 py-2 rounded-md bg-[#FEA116] text-white font-medium">Call Now</a>
              <button onClick={() => scrollToSection("menu")} className="inline-block px-4 py-2 rounded-md border border-[#FEA116] text-[#FEA116] bg-transparent">View Menu</button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img src="/images/hero.png" className="w-[320px] sm:w-[420px] lg:w-[520px] object-cover rounded-3xl shadow-2xl" alt="Restaurant Hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
