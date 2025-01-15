import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromFavouriteAsync,
  selectfavouriteItems,
} from "../features/favourite/favouriteSlice";
import { Link } from "react-router-dom";
import { indiaCurrency } from "../constants/services";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import outlineHeart from "../assets/outline-heart.png";
import filledHeart from "../assets/filled-heart.png";
import {
  fetchProductYouMayAlsoLikeAsync,
  selectProductYouMayAlsoLike,
} from "../features/product/productSlice";
import { addToCartAsync } from "../features/cart/cartSlice";

const ShoppingFavourite = () => {
  const dispatch = useDispatch();
  const productYouMayAlsoLike = useSelector(selectProductYouMayAlsoLike);
  const favouriteItems = useSelector(selectfavouriteItems);
  const [edit, setEdit] = useState(false);
  const handleScroll = (direction) => {
    const container = document.querySelector(".scroll-container");
    const scrollAmount = 500; // Adjust this value as needed
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };
  const [removeFavourite, setRemoveFavourite] = useState([]);
  const favouriteHandler = (item) => {
    if (removeFavourite.includes(item.id)) {
      const arr = [...removeFavourite];
      let index = arr.findIndex((elem) => elem === item);
      arr.splice(index, 1);
      setRemoveFavourite(arr);
    } else {
      const arr = [...removeFavourite, item.id];
      setRemoveFavourite(arr);
    }
    console.log(removeFavourite);
  };
  const handleEdit = () => {
    setEdit(!edit);
    removeFavourite.map((id) => {
      return dispatch(deleteFromFavouriteAsync(id));
    });
  };
  const handleCart = (item) => {
    console.log(item);
    dispatch(
      addToCartAsync({
        product: item.product.id,
        quantity: item.quantity,
        size: item.size,
        color: item.user,
      })
    );
    dispatch(deleteFromFavouriteAsync(item.id));
  };
  useEffect(() => {
    dispatch(fetchProductYouMayAlsoLikeAsync());
  }, [dispatch, favouriteItems]);
  return (
    <div className="px-5 md:px-12">
      {favouriteItems.length ? (
        <div>
          <div className="favourite">
            <div className="fav-first flex justify-between mb-12 mt-4">
              <h1 className="title text-2xl ">Favourite</h1>
              <button
                className={`px-5 py-2 border-2 border-black rounded-xl border-opacity-25 ${
                  edit ? "bg-black text-white" : null
                }`}
                onClick={() => handleEdit()}
              >
                {edit ? "Done" : "Edit"}
              </button>
            </div>
            <div className="fav-second">
              <div className="bag-second mb-5 flex flex-wrap">
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="w-1/2 lg:w-1/3 mt-3">
                      <div className="first relative ">
                        <Link
                          to={
                            edit ? null : `/productOverview/${item.product.id} `
                          }
                        >
                          <img src={item.product.images[0]} alt="" />
                          {edit ? (
                            <img
                              src={
                                removeFavourite.includes(item.id)
                                  ? outlineHeart
                                  : filledHeart
                              }
                              onClick={() => favouriteHandler(item)}
                              className="w-4 top-2 right-2 absolute"
                              alt=""
                            />
                          ) : null}
                        </Link>
                      </div>
                      <div className="second justify-between flex flex-col h-[20vh] ">
                        <div className="">
                          <Link to={`/productOverview/${item.product.id}`}>
                            <h4>{item.product.title}</h4>
                          </Link>
                          <p>
                            {item.product.gender
                              ? item.product.gender
                              : item.product.kids}
                            's {item.product.category}
                          </p>
                          <p className=" text-sm font-medium leading-6 opacity-75 text-gray-900">
                            MRP :{indiaCurrency} {item.product.discountPrice}
                          </p>
                        </div>
                        <button
                          className="border-2 rounded-xl w-fit border-black px-4 py-2 border-opacity-30 mt-3"
                          onClick={() => handleCart(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="yourNextFavourite">
            <div className="youMightAlsoLike">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl   ">Find your next favourite</h2>
                <div className="slide-buttons flex gap-7  ">
                  <div
                    className="left cursor-pointer"
                    onClick={() => handleScroll("left")}
                  >
                    <img src={leftArrow} alt="" className="w-4 h-4" />
                  </div>
                  <div
                    className="right cursor-pointer"
                    onClick={() => handleScroll("right")}
                  >
                    <img src={rightArrow} alt="" className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="scroll-container scroll-smooth flex flex-row overflow-x-auto mt-4">
                {productYouMayAlsoLike &&
                  productYouMayAlsoLike.map((product) => (
                    <Link to={`/productOverview/${product.id}`}>
                      <div className=" mx-2 text-left">
                        <img
                          src={product.images[0]}
                          className="max-w-[70vw] md:max-w-[30vw]"
                          alt=""
                        />
                        <div className="">
                          <p className="text-sm px-2">{product.title}</p>
                          <p className="text-sm px-2 opacity-70">
                            {product.gender ? product.gender : product.kids}'s{" "}
                            {product.category}
                          </p>
                          <p className="my-5">
                            MRP {indiaCurrency}
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShoppingFavourite;
