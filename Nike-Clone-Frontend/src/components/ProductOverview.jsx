import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import upArrow from "../assets/up-arrow.png";
import downArrow from "../assets/down-arrow.png";
import outlineHeart from "../assets/outline-heart.png";
import filledHeart from "../assets/filled-heart.png";
import {
  fetchProductByIdAsync,
  selectSelectedProduct,
} from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, selectCartItems } from "../features/cart/cartSlice";
import { indiaCurrency } from "../constants/services";
import {
  addTofavouriteAsync,
  deleteFromFavouriteAsync,
  selectfavouriteItems,
} from "../features/favourite/favouriteSlice";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductOverview = ({ id }) => {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);
  const cartItem = useSelector(selectCartItems);
  const favouriteItem = useSelector(selectfavouriteItems);
  const reviews = { href: "#", average: 4, totalCount: 117 };
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [showDeliveryReturn, setShowDeliveryReturn] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const addToCartHandler = () => {
    if (cartItem.findIndex((item) => item.product.id === product.id) < 0) {
      if (selectedColor && selectedSize) {
        dispatch(
          addToCartAsync({
            product: product.id,
            quantity: 1,
            size: selectedSize,
            color: selectedColor.name,
          })
        );
        if (
          favouriteItem.findIndex((item) => item.product.id === product.id) < 0
        ) {
          return;
        } else {
          const item = favouriteItem.find(
            (item) => item.product.id === product.id
          );

          dispatch(deleteFromFavouriteAsync(item.id));
        }
      } else {
        alert("Select a size or color");
      }
    } else {
      alert("This item is already in the cart");
    }
  };
  const addToFavouriteHandler = () => {
    if (cartItem.findIndex((item) => item.product.id === product.id) < 0) {
      if (
        favouriteItem.findIndex((item) => item.product.id === product.id) < 0
      ) {
        if (selectedColor && selectedSize) {
          dispatch(
            addTofavouriteAsync({
              product: product.id,
              quantity: 1,
              size: selectedSize,
              color: selectedColor.name,
            })
          );
        } else {
          alert("Select a size or color");
        }
      } else {
        const item = favouriteItem.find(
          (item) => item.product.id === product.id
        );

        dispatch(deleteFromFavouriteAsync(item.id));
      }
    } else {
      alert("Item already added in the cart");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [dispatch, id]);
  return (
    <>
      {product ? (
        <div className="px-5 md:px-12 w-full ">
          <div className="wide md:flex md:px-4 ">
            {/* TODO:Make the viewImage sticky */}
            <div className="viewImage md:flex md:w-4/6 hidden items-center justify-around  h-fit ">
              <div className="wide-first h-fit">
                {product.images &&
                  product.images.map((image, index) => (
                    <div
                      className="border-2 hover:border-gray-400 my-2 transition-all duration-300 cursor-pointer rounded-lg p-3 md:w-fit"
                      onMouseOver={() => setCurrentImage(index)}
                    >
                      <img src={image} alt="" className="w-[3vw]" />
                    </div>
                  ))}
              </div>

              <div className="wide-second   h-fit ">
                <div className="">
                  <img
                    src={product.images && product.images[currentImage]}
                    className="    h-[80vh] w-[35vw]"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="wide-third md:overflow-y-auto md:w-2/6  md:px-4">
              <div className="first">
                <h1 className="text-lg font-Oswald">{product.title}</h1>
                {product.gender && <p>Gender:{product.gender}</p>}
                {product.kids && <p>Kids:{product.kids}</p>}
                <p className="mt-2 text-sm text-gray-700 font-semibold ">
                  MRP : {indiaCurrency}
                  {product.discountPrice}
                </p>
                <p className="cursor-pointer opacity-50">
                  incl. of taxes <br /> (Also includes all applicable duties)
                </p>
                <div className="md:hidden scroll-container scroll-smooth flex flex-row overflow-x-auto ">
                  {product.images &&
                    product.images.map((image) => (
                      <div className=" mx-2 text-left">
                        <img src={image} className="max-w-[90vw] " alt="" />
                      </div>
                    ))}
                </div>
              </div>
              <div className="second-colors my-8 ">
                <h3 className="text-sm font-medium text-gray-900 my-4">
                  Color
                </h3>

                <div className="flex space-x-4">
                  {product.colors &&
                    product.colors.map((color) => (
                      <div
                        className={`${
                          color.class
                        } w-5 h-5 rounded-full cursor-pointer   ${
                          selectedColor === color
                            ? "border-yellow-500 p-1 "
                            : "border-black"
                        } border-2 `}
                        onClick={() => setSelectedColor(color)}
                        title={`${color.name}`}
                        style={{
                          background: `${color.selectedClass}`,
                        }}
                      ></div>
                    ))}
                </div>
              </div>
              <div className="second mb-10">
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <p
                      href="#"
                      className="text-sm font-medium opacity-80 text-black hover:opacity-100 cursor-pointer"
                    >
                      Size guide
                    </p>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          // disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              true
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-black" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size}
                              </RadioGroup.Label>
                              {true ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-black"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="third my-2 space-y-4">
                <button
                  className=" w-full bg-black text-white py-4 rounded-full hover:opacity-90"
                  onClick={addToCartHandler}
                >
                  Add to Bag
                </button>
                <button
                  className=" w-full  flex items-center justify-center border-2 border-black border-opacity-30 hover:border-opacity-100 py-4 rounded-full"
                  onClick={addToFavouriteHandler}
                >
                  <p className="mr-1">Favourite</p>
                  {favouriteItem?.findIndex(
                    (item) => item.product.id === product.id
                  ) < 0 ? (
                    <img src={outlineHeart} className="w-4" alt="" />
                  ) : (
                    <img src={filledHeart} className="w-4 " alt="" />
                  )}
                </button>
              </div>
              <div className="fourth my-3 mt-7">
                <p>{product.detail}</p>
                <div className="highlights space-y-2 my-4">
                  <h1 className="font-bold">Highlights</h1>
                  <li>{product.highlights[0]}</li>
                  <li>{product.highlights[1]}</li>
                  <li>{product.highlights[2]}</li>
                  <li>{product.highlights[3]}</li>
                </div>
                <div className="fourth-inside ">
                  <div className="deliveryReturn my-5">
                    <div
                      className="flex justify-between items-center my-5"
                      onClick={() =>
                        setShowDeliveryReturn(
                          (showDeliveryReturn) => !showDeliveryReturn
                        )
                      }
                    >
                      <h2 className="font-Oswald text-xl">
                        Delivery & Returns
                      </h2>
                      <img
                        src={showDeliveryReturn ? upArrow : downArrow}
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                    <div
                      className={`${
                        showDeliveryReturn ? "block" : "hidden"
                      } space-y-4 `}
                    >
                      <p>All purchases are subject to delivery fees.</p>
                      <li>Standard delivery 4–9 business days</li>
                      <p>
                        Orders are processed and delivered Monday–Friday
                        (excluding public holidays)
                      </p>
                      <p>Nike Members enjoy free returns.</p>
                    </div>
                  </div>
                  <div className="reviews my-5">
                    <div
                      className="flex justify-between items-center my-5 "
                      onClick={() => setShowReview((showReview) => !showReview)}
                    >
                      <h2 className="font-Oswald text-xl">Reviews(2)</h2>
                      <div className="">
                        <div className="">
                          <h3 className="sr-only">Reviews</h3>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    reviews.average > rating
                                      ? "text-gray-900"
                                      : "text-gray-200",
                                    "h-5 w-5 flex-shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">
                              {reviews.average} out of 5 stars
                            </p>
                          </div>
                        </div>
                      </div>
                      <img
                        src={showReview ? upArrow : downArrow}
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                    <div
                      className={`${
                        showReview ? "block" : "hidden"
                      } space-y-4 `}
                    >
                      <p className="underline cursor-pointer">Write a review</p>
                      <div className="review">
                        <div className="review-first">
                          <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      reviews.average > rating
                                        ? "text-gray-900"
                                        : "text-gray-200",
                                      "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <p className="sr-only">
                                {reviews.average} out of 5 stars
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="review-second">
                          <p>
                            They’re really pretty!! The bottom is plastic, and
                            the color is way brighter then what is on the
                            picture almost like a neon orangy color. But I have
                            a some what wide so go a size up. (I’m 4’11 and I
                            got a size 5 and was a bit tight so I got a 5.5)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="productInfo my-5">
                    <div
                      className="flex justify-between items-center my-5"
                      onClick={() =>
                        setShowProductInfo((productInfo) => !productInfo)
                      }
                    >
                      <h2 className="font-Oswald text-xl">
                        Product Information
                      </h2>
                      <img
                        src={showProductInfo ? upArrow : downArrow}
                        className="w-4 h-4"
                        alt=""
                      />
                    </div>
                    <div
                      className={`${
                        showProductInfo ? "block" : "hidden"
                      } space-y-4`}
                    >
                      <p>
                        Declaration of Importer:
                        {product.declaration}
                      </p>
                      <p>Marketed by: {product.marketedBy}</p>
                      <p>Origin: {product.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductOverview;
