import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import OrderAndDine from "./pages/OrderAndDine";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReserveTable from "./components/ReserveTable";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <div className="px-4">
      <ToastContainer />
      <ScrollToTop />
      <Navbar />{" "}
      {/* firstly, this component will render, then go to route '/' means Home.jsx, then go to Home.jsx */}
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/orderanddine" element={<OrderAndDine />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/place-order" element={<PlaceOrder />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/reserve-table" element={<ReserveTable />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
