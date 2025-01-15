import React from "react";
import Navbar from "../components/Navbar";
import ProductOverview from "../components/ProductOverview";
import Footer from "../components/LandingPage/Footer";
import { useParams } from "react-router-dom";

const ProductOverviewPage = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div className="overflow-y-hidden">
      <Navbar></Navbar>
      <ProductOverview id={id}></ProductOverview>
      <Footer></Footer>
    </div>
  );
};

export default ProductOverviewPage;
