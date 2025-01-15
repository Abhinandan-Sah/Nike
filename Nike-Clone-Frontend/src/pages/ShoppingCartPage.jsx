import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import ShoppingCart from "../containers/ShoppingCart";

const ShoppingCartPage = () => {
  return (
    <div className="relative">
      <Navbar></Navbar>
      <ShoppingCart></ShoppingCart>
      <Footer></Footer>
      <div className="checkout sticky bottom-0 w-full bg-white  items-center flex justify-center md:hidden  ">
        <button className="text-white py-4 my-4 bg-black  rounded-3xl w-[90vw] font-bold">
          Go to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
