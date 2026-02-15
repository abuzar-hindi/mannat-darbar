import React from "react";
import Title from "../components/Title";
import NewsLetter from "../components/NewsLetter";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="font-semibold text-xl text-[#FEA116]">
              Our Restaurant
            </p>
            <h2 className="text-2xl font-bold mt-2 mb-4">
              Visit MANNAT DARBAAR
            </h2>

            <div className="text-gray-600 mb-4">
              <p>Naharbagh, Niyawan, Ayodhya, Faizabad, Uttar Pradesh 224001</p>
              <p className="mt-2">
                Jubairganj, Sohawal, Raunahi Uparhar, Uttar Pradesh 224182
              </p>
            </div>

            <div className="mb-6">
              <h5 className="font-medium">Contact</h5>
              <p className="mt-1">
                Tel:{" "}
                <a href="tel:+918318378572" className="text-[#FEA116]">
                  +91 8318378572
                </a>
              </p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:pushpa@intheworld" className="text-[#FEA116]">
                  mannatdarbaar@gmail.com
                </a>
              </p>
            </div>

            <div className="mt-6">
              <Link to="/about">
                <button className="px-6 py-3 rounded-lg border border-[#FEA116] text-[#FEA116] hover:bg-[#FEA116] hover:text-white transition">
                  Know more
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white space-y-2 rounded-lg shadow-md overflow-hidden flex flex-col min-h-[420px] md:min-h-full">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227994.67311142205!2d81.70666259453125!3d26.762981900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a1bf14809764f%3A0xaf141c8d42e5af2b!2sMannat%20darbaar!5e0!3m2!1sen!2sin!4v1770051880104!5m2!1sen!2sin"
              className="w-full h-64 md:h-full border-0"
            />

            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227994.67311142205!2d81.70666259453125!3d26.762981900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a1bf14809764f%3A0xaf141c8d42e5af2b!2sMannat%20darbaar!5e0!3m2!1sen!2sin!4v1770051880104!5m2!1sen!2sin"
              className="w-full h-64 md:h-full border-0"
            />
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
