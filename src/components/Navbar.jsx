import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCounts, navigate } = useContext(ShopContext);

  return (
    <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-5">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold">
            MD
          </div>
        </Link>
      </div>

      <nav className="hidden sm:flex gap-6 text-sm text-gray-700 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500"}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/orderanddine"
          className={({ isActive }) =>
            `${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500"}`
          }
        >
          Order & Dine
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500"}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500"}`
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/reserve-table"
          className={({ isActive }) =>
            `${isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500 bg-slate-100 px-3 py-1 rounded-md"}`
          }
        >
          Reserve a Table
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setShowSearch(true);
            navigate("/orderanddine");
          }}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <img src={assets.search_icon} className="w-5" alt="search" />
        </button>

        <Link to="/cart" className="relative">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <img src={assets.cart_icon} className="w-5" alt="cart" />
          </button>
          <span className="absolute -right-1 -bottom-1 inline-flex items-center justify-center bg-black text-white text-xs w-5 h-5 rounded-full">
            {getCartCounts()}
          </span>
        </Link>

        <button
          onClick={() => setVisible(true)}
          className="p-2 rounded-md sm:hidden hover:bg-gray-100"
        >
          <img src={assets.menu_icon} className="w-5" alt="menu" />
        </button>
      </div>

      <div
        className={`fixed z-50 top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${visible ? "translate-x-0 w-72" : "translate-x-full w-0"}`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={() => setVisible(false)}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt=""
              />
              <span>Close</span>
            </button>
          </div>

          <nav className="flex-1 overflow-auto p-4 flex flex-col gap-2">
            <NavLink
              onClick={() => setVisible(false)}
              className="text-sm py-2 pl-3 rounded hover:bg-gray-100"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="text-sm py-2 pl-3 rounded hover:bg-gray-100"
              to="/orderanddine"
            >
              Order & Dine
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="text-sm py-2 pl-3 rounded hover:bg-gray-100"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="text-sm py-2 pl-3 rounded hover:bg-gray-100"
              to="/contact"
            >
              Contact
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="text-sm py-2 pl-3 rounded hover:bg-gray-100"
              to="/reserve-table"
            >
              Reserve a Table
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
