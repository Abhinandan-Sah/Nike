import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import ShoppingFavourite from "../containers/ShoppingFavourite";

const ShoppingFavouritePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ShoppingFavourite></ShoppingFavourite>
      <Footer></Footer>
    </div>
  );
};

export default ShoppingFavouritePage;
