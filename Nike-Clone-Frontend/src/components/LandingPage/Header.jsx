import React, { useEffect, useState } from "react";
import image1 from "../../assets/1e8674ca-9bad-49b2-9c92-9618d9d73bff.webp";
import image2 from "../../assets/fullscreen/branding.jpg";
import shoe1 from "../../assets/shoe1.jpg";
import shoe2 from "../../assets/shoe2.jpg";
import shoe3 from "../../assets/shoe3.jpg";
import shoe4 from "../../assets/shoe4.jpg";
import shoe5 from "../../assets/shoe5.jpg";
import teamCollection from "../../assets/TeamCollection.jpg";
import dressToImpress from "../../assets/dressToImpress.jpg";
import mens from "../../assets/mens.jpg";
import womens from "../../assets/womens.jpg";
import kids from "../../assets/kids.jpg";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
const Header = () => {
  const shoeOptions = [
    { image: shoe5, name: "Air Max 270" },
    { image: shoe3, name: "Air Max 95" },
    { image: shoe1, name: "Air Max 97" },
    { image: shoe4, name: "Air Max Plus" },
    { image: shoe2, name: "Air Max 90" },
  ];
  const [showIcons, setShowIcons] = useState(false);
  const [showShoes, setShowShoes] = useState(false);
  const [showClothing, setShowClothing] = useState(false);
  const [showKids, setShowKids] = useState(false);
  const [windowDimention, setWindowDimention] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const detectSize = () => {
    setWindowDimention({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const handleScroll = (direction) => {
    const container = document.querySelector(".scroll-container");
    const scrollAmount = 300; // Adjust this value as needed
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimention]);
  return (
    <header>
      <div className="px-5 md:px-12 w-full">
        <div className="first mb-32 md:mb-14">
          {windowDimention.winWidth > 768 ? (
            <img src={image2} className="w-full" alt="" />
          ) : (
            <img src={image1} alt="" />
          )}
          <div className="first-text text-left md:text-center ">
            <p className="mt-7">Air Max 1</p>
            <h1 className=" text-bolder md:text-bolder-md">No Genres</h1>
            <h1 className="text-bolder md:text-bolder-md">All Soul</h1>
            <Link to="/home">
              <button className="shop-button mt-12   ">Shop</button>
            </Link>
          </div>
        </div>
        <div className="second mb-24">
          <div className="text-left flex justify-between items-center">
            <p className="text-lg px-2 py-7">Air Max Collection</p>
            <div className="slide-buttons md:flex hidden">
              <div className="border-2 border-black rounded-full h-5 w-5 m-2">
                <HiArrowNarrowLeft onClick={() => handleScroll("left")} />
              </div>
              <div className="border-2 border-black rounded-full h-5 w-5 m-2 ">
                <HiArrowNarrowRight onClick={() => handleScroll("right")} />
              </div>
            </div>
          </div>
          <div className="scroll-container scroll-smooth flex flex-row overflow-x-auto ">
            {shoeOptions.map((shoe) => (
              <div className=" mx-2 text-left">
                <img
                  src={shoe.image}
                  className="max-w-[70vw] md:max-w-[30vw]"
                  alt=""
                />
                <p className="text-xl px-2 py-5">{shoe.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="third mb-16">
          <div className="text-left">
            <p className="text-lg px-2 py-7 md:text-[2vw]">Just In</p>
            {windowDimention.winWidth > 768 ? (
              // <video
              //   src={nikeVideoFull}
              //   autoPlay
              //   muted
              //   loop
              //   className="mb-12 w-full "
              // ></video>

              <ReactPlayer
                url="https://youtu.be/VnE7m8JI7MY"
                loop
                playing
                muted
                style={{ pointerEvents: "none" }}
                width="100%"
                className="mb-12 "
                height="100vh"
              />
            ) : (
              // <video
              //   src={nikeVideo}
              //   autoPlay
              //   muted
              //   loop
              //   className="mb-12"
              // ></video>
              <ReactPlayer
                url="https://youtube.com/shorts/YD0wQxl48ZI"
                loop
                playing
                muted
                style={{ pointerEvents: "none" }}
                width="100%"
                className="mb-12 "
                height="65vh"
              />
            )}
            <div className="first-text md:text-center">
              <h1 className=" text-bolder mb-5 md:text-bolder-md ">
                Nike Tech
              </h1>
              <p>
                Engineered to the Exact Specification of Championship Athletes
              </p>
              <button className="shop-button my-5">Shop</button>
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center">
          <div className="fourth text-left">
            <h1 className="text-lg mb-4 md:text-[2vw]">Trending</h1>
            <div className="md:relative">
              <img src={teamCollection} alt="" />
              <div className="first-text my-5 mx-4 space-y-5 md:absolute bottom-10 left-10">
                <h1 className="text-lg ">National Team collection</h1>
                <button className="shop-button">Shop</button>
              </div>
            </div>
          </div>
          <div className="fifth relative ">
            <img src={dressToImpress} className="opacity-90" alt="" />
            <div className="text-first  absolute bottom-5 md:bottom-48 left-5 space-y-5 ">
              <h1 className="text-white">Dress to Impress</h1>
              <button className="shop-button-white">Shop</button>
            </div>
          </div>
        </div>
        <div className="sixth text-left md:text-center">
          <h1 className="text-lg mt-10 mb-4 md:text-[2vw] text-left">
            The Latest
          </h1>
          {windowDimention.winWidth > 768 ? (
            <ReactPlayer
              url="https://youtu.be/O-JXUhhIRHU"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              height="80vh"
            />
          ) : (
            <ReactPlayer
              url="https://youtube.com/shorts/V5Vfjd1am4E"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              height="65vh"
            />
          )}

          <p>Nike App Early Access</p>
          <h1 className="text-bolder md:text-bolder-md">Air Jordan XXXVIII </h1>
          <h1 className="text-bolder md:text-bolder-md">"Fundamental"</h1>
          <div className="text-center flex justify-start md:justify-center w-full">
            <p className="md:max-w-[50%]">
              Enter the next chapter of the Air Jordan Legacy . Build to run
              floor , our "Fundamental" white,black and red colours way keeps
              the newest AJ true to our Jordan Brand DNA
            </p>
          </div>
          <button className="shop-button my-5">Shop</button>
        </div>
        <div className="seventh text-left">
          <h3 className="text-lg my-5 md:text-[2vw]">Don't Miss</h3>
          {windowDimention.winWidth > 768 ? (
            <ReactPlayer
              url="https://youtu.be/E2-efiAcS3w"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              height="80vh"
            />
          ) : (
            <ReactPlayer
              url="https://youtube.com/shorts/_Df7NxfmvQA"
              loop
              playing
              muted
              style={{ pointerEvents: "none" }}
              width="100%"
              className="mb-12 "
              height="65vh"
            />
          )}
          <div className="firstText md:text-center">
            <p>Jordan Apparel</p>
            <h1 className="text-bolder md:text-bolder-md">
              Shades of <br className="md:hidden"></br> blue
            </h1>
            <p className="py-8">
              Keep your looks cool in wover pants , warm up jackets and fleece
              pieces
            </p>
            <button className="shop-button">Shop</button>
          </div>
        </div>
        <div className="eight text-left py-12 ">
          <p className="text-lg my-6">The Essentials</p>
          <div className="eight-images sm:flex">
            <div className="first-img relative my-3 sm:mx-2">
              <img src={mens} alt="" />
              <button className="shop-button-white absolute bottom-5 left-5">
                {" "}
                Men's
              </button>
            </div>
            <div className="first-img relative my-3 sm:mx-2">
              <img src={womens} alt="" />
              <button className="shop-button-white absolute bottom-5 left-5">
                {" "}
                Women's
              </button>
            </div>
            <div className="first-img relative my-3 sm:mx-2">
              <img src={kids} alt="" />
              <button className="shop-button-white absolute bottom-5 left-5">
                {" "}
                Kid's
              </button>
            </div>
          </div>
        </div>
        <div className="nine  text-left py-12 sm:flex sm:justify-around">
          <div className="firstOption my-4 ">
            <h2
              className="text-lg font-Oswald "
              onClick={() => setShowIcons((show) => !show)}
            >
              Icons
            </h2>
            <div
              className={`firstOptions my-3 mx-6 space-y-2 opacity-50  ${
                showIcons ? "block" : "hidden"
              } sm:block sm:text-s sm:mx-0`}
            >
              <p className="cursor-pointer">Air Force 1</p>
              <p className="cursor-pointer">Huarache</p>
              <p className="cursor-pointer">Air Max 90</p>
              <p className="cursor-pointer">Air Max 95</p>
              <p className="cursor-pointer">Air Max 97</p>
              <p className="cursor-pointer">Air Max 270</p>
              <p className="cursor-pointer">Air Max 720</p>
              <p className="cursor-pointer">All Air Max</p>
              <p className="cursor-pointer">Vapormax</p>
            </div>
          </div>
          <div className="secondOption my-4">
            <h2
              className="text-lg font-Oswald "
              onClick={() => setShowShoes((show) => !show)}
            >
              Shoes
            </h2>
            <div
              className={`secondOptions my-3 mx-6 space-y-2 opacity-50 ${
                showShoes ? "block" : "hidden"
              } sm:block sm:text-s sm:mx-0`}
            >
              <p className="cursor-pointer">All Shoes</p>
              <p className="cursor-pointer">Custom Shoes</p>
              <p className="cursor-pointer">Jordan Shoes</p>
              <p className="cursor-pointer">Running Shoes</p>
              <p className="cursor-pointer">Basketball Shoes</p>
              <p className="cursor-pointer">Football Shoes</p>
              <p className="cursor-pointer">Gym and Training Shoes</p>
              <p className="cursor-pointer">Lifestyle Shoes</p>
            </div>
          </div>
          <div className="thirdOption my-4">
            <h2
              className="text-lg font-Oswald "
              onClick={() => setShowClothing((show) => !show)}
            >
              Clothing
            </h2>
            <div
              className={`thirdOptions my-3 mx-6 space-y-2 opacity-50 ${
                showClothing ? "block" : "hidden"
              } sm:block sm:text-s sm:mx-0`}
            >
              <p className="cursor-pointer">All Clothing</p>
              <p className="cursor-pointer">Modest Wear</p>
              <p className="cursor-pointer">Hoodies & Pullovers</p>
              <p className="cursor-pointer">Shirts & Tops</p>
              <p className="cursor-pointer">Jackets</p>
              <p className="cursor-pointer">Compression & Nike Pro</p>
              <p className="cursor-pointer">Trousers & Leggings</p>
              <p className="cursor-pointer">Shorts</p>
            </div>
          </div>
          <div className="fourthOption my-4">
            <h2
              className="text-lg font-Oswald "
              onClick={() => setShowKids((show) => !show)}
            >
              Kids'
            </h2>
            <div
              className={`fourthOptions my-3 mx-6 space-y-2 opacity-50 ${
                showKids ? "block" : "hidden"
              } sm:block sm:text-s sm:mx-0`}
            >
              <p className="cursor-pointer">Infant & Toddler Shoes</p>
              <p className="cursor-pointer">Kids' Shoes</p>
              <p className="cursor-pointer">Kids' Basketball Shoes</p>
              <p className="cursor-pointer">Kids' Running Shoes</p>
              <p className="cursor-pointer">Kids' Clothing</p>
              <p className="cursor-pointer">Kids' Backpacks</p>
              <p className="cursor-pointer">Kids' Socks</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
