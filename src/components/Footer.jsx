import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-gray-200 pt-12 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-lg mb-2">MANNAT DARBAAR</h4>
            <p className="text-sm text-gray-300">Authentic flavors, warm hospitality.</p>
            <div className="mt-4 flex flex-col gap-2">
              <button onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }} className="text-sm text-gray-300 hover:text-white text-left">Menu</button>
              <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link>
              <Link to="/about" className="text-sm text-gray-300 hover:text-white">About Us</Link>
              <Link to="/orderanddine" className="text-sm text-gray-300 hover:text-white">Order & Dine</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-lg mb-2">Contact</h4>
            <p className="text-sm"><a href="tel:+918318378572" className="hover:text-white">+91 8318378572</a></p>
            <p className="text-sm"><b>Price Range:</b> ₹200–400 per person</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-lg mb-2">Opening Hours</h4>
            <p className="text-sm">Monday - Sunday</p>
            <p className="text-sm">11:00 AM - 11:30 PM</p>
            <div className="mt-3 text-sm">
              <p>Breakfast • Brunch • Lunch</p>
              <p>Dinner • Dessert • Catering</p>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="text-white text-lg font-semibold mb-2">Highlights</h6>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Great Coffee/Tea</li>
              <li>Restroom • Free Wi-fi</li>
              <li>Outdoor Seating • High Chairs</li>
              <li>Free Parking • Family Friendly</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MANNAT DARBAAR — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
