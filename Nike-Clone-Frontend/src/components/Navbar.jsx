import React, { useState } from "react";
import NikeLogo from "../assets/favicon.ico";
import Bag from "../assets/bag.png";
import Hamburger from "../assets/hamburger.png";
import Search from "../assets/search.png";
import Heart from "../assets/outline-heart.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLogginUser } from "../features/auth/authSlice";
import userImg from "../assets/user.png";
import { selectCartItems } from "../features/cart/cartSlice";
import SlidingNavbar from "./SlidingNavbar";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLogginUser);
  const loginOption = ["Find a store", "Help", "Join us", "Login"];
  const loginUserOption = ["Find a store", "Help", "Hi ,"];
  const [help, showHelp] = useState(false);
  const [profile, showProfile] = useState(false);
  const mouseEnterEvent = (opt) => {
    if (opt === "Help") {
      showHelp(true);
    }
    if (opt === "Hi ,") {
      showProfile(true);
    }
  };
  const mouseLeaveEvent = (opt) => {
    if (opt === "Help") {
      showHelp(false);
    }
    if (opt === "Hi ,") {
      showProfile(false);
    }
  };
  const profileOpt = [
    { label: "Profile", link: "/profile" },
    { label: "Orders", link: "/orders" },
    { label: "Favourits", link: "/favourites" },
    { label: "Inbox", link: "/inbox" },
    { label: "Experiences", link: "/experiences" },
    { label: "Account Settings", link: "/accountSettings" },
    { label: "Log Out", link: "/logout" },
  ];
  const helpOpts = [
    { label: "Order Status", link: "/orderStatus" },
    { label: "Dispatch and Delivery", link: "/dispatchAndDelivery" },
    { label: "Return", link: "/return" },
    { label: "Contact Us", link: "/contact Us" },
    { label: "Privacy Policy", link: "/privacyPolicy" },
    { label: "Terms and Sale", link: "/termAndSale" },
    { label: "Terms and Use", link: "/termAndUse" },
    { label: "Send us feedback", link: "/sendUsFeedback" },
  ];
  const handleSubOptionClick = (options) => {
    if (options.link === "/logout") {
      dispatch(logoutUserAsync());
    }
  };
  const handleOptionClick = (opt) => {
    if (opt === "Join us") {
      navigate("/signup");
    }
    if (opt === "Login") {
      navigate("/login");
    }
  };
  return (
    <nav>
      <div className="first md:flex hidden">
        <div className="px-5 md:px-12 pt-2 flex justify-between items-center w-full relative ">
          <div className="first-first">
            <svg height="24px" width="24px" fill="#111" viewBox="0 0 26 32">
              <path d="M14.4 5.52v-.08q0-.56.36-1t.92-.44 1 .36.48.96-.36 1-.96.4l-.24.08.08.12-.08.44-.16 1.28q.08.08.08.16l-.16.8q-.08.16-.16.24l-.08.32q-.16.64-.28 1.04t-.2.64V12q-.08.4-.12.64t-.28.8q-.16.32 0 1.04l.08.08q0 .24.2.56t.2.56q.08 1.6-.24 2.72l.16.48q.96.48.56 1.04l.4.16q.96.48 1.36.84t.8.76q.32.08.48.24l.24.08q1.68 1.12 3.36 2.72l.32.24v.08l-.08.16.24.16h.08q.24.16.32.16h.08q.08 0 .16-.08l.16-.08q.16-.16.32-.24h.32q.08 0 0 .08l-.32.16-.4.48h.56l.56.08q.24-.08.4-.16l.4-.24q.24-.08.48.16h.08q.08.08-.08.24l-.96.88q-.4.32-.72.4l-1.04.72q-.08.08-.16 0l-.24-.32-.16-.32-.2-.28-.24-.32-.2-.24-.16-.2-.32-.24q-.16 0-.32-.08l-1.04-.8q-.24 0-.56-.24-1.2-1.04-1.6-1.28l-.48-.32-.96-.16q-.48-.08-1.28-.48l-.64-.32q-.64-.32-.88-.32l-.32-.16q-.32-.08-.48-.16l-.16-.16q-.16 0-.32.08l-1.6.8-2 .88q-.8.64-1.52 1.04l-.88.4-1.36.96q-.16.16-.32 0l-.16.16q-.24.08-.32.08l-.32.16v.16h-.16l-.16.24q-.16.32-.32.36t-.2.12-.08.12l-.16.16-.24.16-.36-.04-.48.08-.32.08q-.4.08-.64-.12t-.4-.6q-.16-.24.16-.4l.08-.08q.08-.08.24-.08h.48L1.6 26l.32-.08q0-.16.08-.24.08-.08.24-.08v-.08q-.08-.16-.08-.32-.08-.16-.04-.24t.08-.08h.04l.08.24q.08.4.24.24l.08-.16q.08-.16.24-.16l.16.16.16-.16-.08-.08q0-.08.08-.08l.32-.32q.4-.48.96-.88 1.12-.88 2.4-1.36.4-.4.88-.4.32-.56.96-1.2.56-.4.8-.56.16-.32.4-.32H10l.16-.16q.16-.08.24-.16v-.4q0-.4.08-.64t.4-.24l.32-.32q-.16-.32-.16-.72h-.08q-.16-.24-.16-.48-.24-.4-.32-.64h-.24q-.08.24-.4.32l-.08.16q-.32.56-.56.84t-.88.68q-.4.4-.56.88-.08.24 0 .48l-.08.16h.08q0 .16.08.16h.08q.16.08.16.2t-.24.08-.36-.16-.2-.12l-.24.24q-.16.24-.32.2t-.08-.12l.08-.08q.08-.16 0-.16l-.64.16q-.08.08-.2 0t.04-.16l.4-.16q0-.08-.08-.08-.32.16-.64.08l-.4-.08-.08-.08q0-.08.08-.08.32.08.8-.08l.56-.24.64-.72.08-.16q.32-.64.68-1.16t.76-.84l.08-.32q.16-.32.32-.56t.4-.64l.24-.32q.32-.48.72-.48l.24-.24q.08-.08.08-.24l.16-.16-.08-.08q-.48-.4-.48-.72-.08-.56.36-.96t.88-.36.68.28l.16.16q.08 0 .08.08l.32.16v.24q.16.16.16.24.16-.24.48-.56l.4-1.28q0-.32.16-.64l.16-.24v-.16l.24-.96h.16l.24-.96q.08-.24 0-.56l-.32-.8z"></path>
            </svg>
          </div>
          <div className="first-second items-center flex">
            {user ? (
              <>
                {" "}
                {loginUserOption &&
                  loginUserOption.map((opt, index) => (
                    <div className="flex items-center relative">
                      <p
                        className="text-xs hover:opacity-70 cursor-pointer"
                        onMouseEnter={() => mouseEnterEvent(opt)}
                        onMouseLeave={() => mouseLeaveEvent(opt)}
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt}
                      </p>
                      {opt === "Help" && (
                        <div
                          onMouseEnter={() => showHelp(true)}
                          onMouseLeave={() => showHelp(false)}
                          className={`absolute ${
                            help ? "block" : "hidden"
                          } top-5 bg-white w-max rounded-md cursor-pointer z-40`}
                        >
                          <h1 className="text-lg my-5 mx-5">Help</h1>
                          <div className="space-y-3 px-5 ">
                            {helpOpts &&
                              helpOpts.map((options) => (
                                <p className="opacity-75 hover:opacity-100">
                                  {options.label}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}
                      {opt === "Hi ," && (
                        <div
                          onMouseEnter={() => showProfile(true)}
                          onMouseLeave={() => showProfile(false)}
                          className={`absolute ${
                            profile ? "block" : "hidden"
                          } top-5 bg-white w-max rounded-md cursor-pointer z-40`}
                        >
                          <h1 className="text-lg my-5 mx-5">Account</h1>
                          <div className="space-y-3 px-5 ">
                            {profileOpt &&
                              profileOpt.map((options) => (
                                <p
                                  className="opacity-75 hover:opacity-100"
                                  onClick={() => handleSubOptionClick(options)}
                                >
                                  {options.label}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}

                      <div
                        className={`mx-3 ${
                          index === loginUserOption.length - 1
                            ? "hidden"
                            : "block"
                        }`}
                      >
                        |
                      </div>
                    </div>
                  ))}
                <div
                  className=" flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => showProfile(true)}
                  onMouseLeave={() => showProfile(false)}
                >
                  <p className="text-xs hover:opacity-70 cursor-pointer">
                    {user?.id}
                  </p>
                  <img src={userImg} className="w-7 mx-1" alt="" />
                </div>
              </>
            ) : (
              <>
                {" "}
                {loginOption &&
                  loginOption.map((opt, index) => (
                    <div className="flex items-center relative">
                      <p
                        className="text-xs hover:opacity-70 cursor-pointer"
                        onMouseEnter={() => mouseEnterEvent(opt)}
                        onMouseLeave={() => mouseLeaveEvent(opt)}
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt}
                      </p>
                      {opt === "Help" && (
                        <div
                          onMouseEnter={() => showHelp(true)}
                          onMouseLeave={() => showHelp(false)}
                          className={`absolute ${
                            help ? "block" : "hidden"
                          } top-5 bg-white w-max rounded-md cursor-pointer z-40`}
                        >
                          <h1 className="text-lg my-5 mx-5">Help</h1>
                          <div className="space-y-3 px-5 ">
                            {helpOpts &&
                              helpOpts.map((options) => (
                                <p className="opacity-75 hover:opacity-100">
                                  {options.label}
                                </p>
                              ))}
                          </div>
                        </div>
                      )}
                      <div
                        className={`mx-3 ${
                          index === loginOption.length - 1 ? "hidden" : "block"
                        }`}
                      >
                        |
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="second">
        <div className="px-5 md:px-12 md:py-2 flex justify-between items-center">
          <Link to="/home">
            <img src={NikeLogo} alt="" />
          </Link>
          <div className="hidden lg:flex space-x-8 cursor-pointer">
            <h3>New & Featured</h3>
            <h3>Men</h3>
            <h3>Women</h3>
            <h3>Kids</h3>
            <h3>Sale</h3>
            <h3>SNKRS</h3>
            <Link to="/admin/home">
              <h3 className={`${user?.role === "Admin" ? "block" : "hidden"}`}>
                Admin
              </h3>
            </Link>
          </div>
          <div className="icons flex my-3 justify-around gap-5">
            <img src={Search} className="w-7 h-7 " alt="" />
            <input
              className="hidden md:block border-2 px-4 py-1 rounded-lg focus:border-black"
              placeholder="Search"
              type="text"
            />
            <Link to="/shoppingFavourite" className="hidden md:flex">
              <img src={Heart} className="w-7 h-7" alt="" />
            </Link>
            <Link to="/shoppingCart">
              <div className=" relative ">
                <img src={Bag} className="w-7 h-7" alt="" />
                <p className="absolute top-3 text-xs left-2.5">
                  {cartItems?.length}
                </p>
              </div>
            </Link>
            <img src={userImg} className="w-8 h-8 md:hidden  " alt="" />
            <img src={Hamburger} onClick={()=>setOpen(true)} className="w-7 h-7 md:hidden" alt="" />
            <SlidingNavbar open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
