import React, { useState } from "react";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import youtube from "../../assets/youtube.png";
import instagram from "../../assets/instagram.png";
import location from "../../assets/location.png";
const Footer = () => {
  const [getHelp, setGetHelp] = useState(false);
  const [aboutNike, setAboutNike] = useState(false);
  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className=" bg-[#111] text-white px-5 md:px-12 ">
        <div className="md:flex md:justify-between md:items-start">
          <div className="first uppercase text-left tracking-tighter font-Oswald space-y-4 pt-12 mb-4 md:w-1/5 md:my-2">
            <h4 className="">Find a store</h4>
            <h4 className="">Become a member</h4>
            <h4 className="">Send Us Feedback</h4>
            <h4 className="">Student Discount</h4>
          </div>
          <div className="second text-left my-12 space-y-4 md:flex md:justify-around md:w-3/5">
            <div className="first-second">
              <div
                className=" flex justify-between"
                onClick={() => setGetHelp((show) => !show)}
              >
                <h2 className="text-lg font-Oswald uppercase ">get help</h2>
                {getHelp ? (
                  <span className="md:hidden">&#8722;</span>
                ) : (
                  <span className="md:hidden">&#43;</span>
                )}
              </div>
              <div className="first-options">
                <div
                  className={`options my-3 text-xs mx-3 space-y-2  ${
                    getHelp ? "block" : "hidden"
                  } md:block`}
                >
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Order Status
                  </p>
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Delivery
                  </p>
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Returs
                  </p>
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Payment Options
                  </p>
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Contact Us on Nike.com Inquiries
                  </p>
                  <p className="cursor-pointer hover:opacity-100 opacity-50">
                    Contact Us On All Other Inqueries
                  </p>
                </div>
              </div>
            </div>
            <div className="second-second">
              <div
                className="flex justify-between"
                onClick={() => setAboutNike((show) => !show)}
              >
                <h2 className="text-lg font-Oswald uppercase ">About Nike</h2>
                {aboutNike ? (
                  <span className="md:hidden">&#8722;</span>
                ) : (
                  <span className="md:hidden">&#43;</span>
                )}
              </div>
              <div
                className={`options my-3 text-xs mx-3 space-y-2  ${
                  aboutNike ? "block" : "hidden"
                } md:block`}
              >
                <p className="cursor-pointer hover:opacity-100 opacity-50">
                  News
                </p>
                <p className="cursor-pointer hover:opacity-100 opacity-50">
                  Careers
                </p>
                <p className="cursor-pointer hover:opacity-100 opacity-50">
                  Investors
                </p>
                <p className="cursor-pointer hover:opacity-100 opacity-50">
                  Sustainability
                </p>
              </div>
            </div>
          </div>
          <div className="third flex space-x-5 md:w-1/5 md:my-12">
            <img src={twitter} className="w-10 h-10" alt="" />
            <img src={facebook} className="w-10 h-10" alt="" />
            <img
              src={youtube}
              className="w-10 h-10 p-1 rounded-full invert bg-[#7e7e7e]"
              alt=""
            />
            <img src={instagram} className="w-10 h-10" alt="" />
          </div>
        </div>
        <div className="md:flex md:justify-between">
          <div className="fourth text-left md:flex md:space-x-10  md:items-center ">
            <div className="fourth-first flex items-center md:space-x-4 my-10 md:my-1 ">
              <img src={location} className="invert w-4 h-4" alt="" />
              <p>India</p>
            </div>
            <div className="fourth-second ">
              <p className="cursor-pointer opacity-60 hover:opacity-100">
                &copy; 2023 Nike,Inc. All Rights Reserved
              </p>
            </div>
          </div>
          <div className="fifth text-left text-sm  py-12 space-y-7 md:flex md:space-x-8 md:space-y-0 md:py-1 ">
            <p className="cursor-pointer opacity-60 hover:opacity-100 ">
              Guides
            </p>
            <p className="cursor-pointer opacity-60 hover:opacity-100 ">
              Terms of Sale
            </p>
            <p className="cursor-pointer opacity-60 hover:opacity-100 ">
              Terms of Use
            </p>
            <p className="cursor-pointer opacity-60 hover:opacity-100 ">
              Nike Private Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
