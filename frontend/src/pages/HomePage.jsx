import React from "react";
import CardsComp from "../components/cards/CardsComp";
import Carousel from "../components/carousel/Carousel";
// import Footer from "../components/footer/Footer";
// import Navbar from "../components/navbar/Navbar";

function HomePage() {


  return (
    <div>
      {/* <Navbar /> */}
      
      <Carousel />
      <CardsComp />
      {/* <Footer/> */}
    </div>
  );
}

export default HomePage;
