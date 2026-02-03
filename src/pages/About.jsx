import React from "react";
import Title from "../components/Title";
import Services from "../components/Services";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="px-6 ld:px-12">
      <div className="text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="text-gray-500 mt-2">
          A curated dining experience rooted in authentic flavors and warm
          hospitality.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-12 lg:py-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <img
                className="w-full h-48 object-cover rounded-lg shadow-md"
                src="/images/about-1.jpg"
                alt="About"
              />
              <img
                className="w-full h-48 object-cover rounded-lg shadow-md"
                src="/images/about-2.jpg"
                alt="About"
              />
              <img
                className="w-full h-48 object-cover rounded-lg shadow-md"
                src="/images/about-3.jpg"
                alt="About"
              />
              <img
                className="w-full h-48 object-cover rounded-lg shadow-md"
                src="/images/about-4.jpg"
                alt="About"
              />
            </div>
          </div>

          <div>
            <h5 className="text-sm text-gray-500 mb-2">About Us</h5>
            <h1 className="mb-4 text-3xl lg:text-4xl font-bold">
              Welcome to <span className="text-[#FEA116]">MANNAT DARBAAR</span>
            </h1>
            <p className="mb-4 text-gray-600">
              At MANNAT DARBAAR we are committed to an exceptional dining
              experience — crafted dishes, hospitable service, and a warm
              atmosphere for every occasion.
            </p>
            <p className="mb-4 text-gray-600">
              Located in the heart of Faizabad, we offer a diverse menu
              featuring both traditional and modern cuisine. Whether it's a
              casual meal or a special celebration, we have something for
              everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-4 bg-orange-50 rounded-lg p-4">
                <div className="text-3xl">🍽️</div>
                <div>
                  <div className="text-2xl font-bold text-[#FEA116]">10</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-orange-50 rounded-lg p-4">
                <div className="text-3xl">⭐</div>
                <div>
                  <div className="text-2xl font-bold text-[#FEA116]">4.7</div>
                  <div className="text-sm text-gray-600">Google Rating</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-3">Highlights</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-[#FEA116]">✓</span> Live Music
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FEA116]">✓</span> Indoor / Outdoor
                  Seating
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FEA116]">✓</span> Free Wifi & Parking
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FEA116]">✓</span> Family Friendly /
                  Kid's Menu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="text-gray-500 mt-2">
            Simple steps to get great food quickly — whether you dine in, pick
            up, or get it delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FEA116] font-bold flex items-center justify-center">
              1
            </div>
            <h4 className="font-semibold text-lg">Choose</h4>
            <p className="text-sm text-gray-600">
              Browse our curated menu, filter by category, and select your
              favorites with detailed descriptions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FEA116] font-bold flex items-center justify-center">
              2
            </div>
            <h4 className="font-semibold text-lg">Order</h4>
            <p className="text-sm text-gray-600">
              Choose delivery or pick-up, pick options and quantities, then
              review your cart before checkout.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FEA116] font-bold flex items-center justify-center">
              3
            </div>
            <h4 className="font-semibold text-lg">Enjoy</h4>
            <p className="text-sm text-gray-600">
              Receive freshly prepared food at your door, or enjoy it in our
              cozy dining space — bon appétit!
            </p>
          </div>
        </div>
      </div>

      <div className="text-3xl py-6">
        <Title text1={"WHAT"} text2={"WE OFFER"} />
      </div>

      <Services />
      <NewsLetter />
    </div>
  );
};

export default About;
