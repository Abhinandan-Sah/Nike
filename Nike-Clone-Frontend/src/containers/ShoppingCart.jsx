import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  deleteFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import dustbin from "../assets/dustbin.png";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import {
  fetchProductYouMayAlsoLikeAsync,
  selectProductYouMayAlsoLike,
  selectProducts,
} from "../features/product/productSlice";
import { indiaCurrency } from "../constants/services";
import {
  deleteFromFavouriteAsync,
  selectfavouriteItems,
} from "../features/favourite/favouriteSlice";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const favouriteItems = useSelector(selectfavouriteItems);

  const productYouMayAlsoLike = useSelector(selectProductYouMayAlsoLike);
  const handleScroll = (direction) => {
    const container = document.querySelector(".scroll-container");
    const scrollAmount = 300; // Adjust this value as needed
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleRemove = (item) => {
    dispatch(deleteFromCartAsync(item.id));
  };
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
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
  }, [dispatch, cartItems, favouriteItems]);

  return (
    <div className="px-5 md:px-12">
      {cartItems.length ? (
        <div className="">
          <div className="md:flex lg:px-48">
            <div className="bag w-full md:w-2/3">
              <div className="bag-first flex flex-col md:items-start items-center my-10">
                <h1 className="text-2xl font-semibold">Bag</h1>
                <h1 className="text-lg opacity-80 md:hidden">
                  {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"} |
                  -
                </h1>
              </div>
              <div className="bag-second mb-5">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="flex py-4">
                      <div className="item-img w-1/6 flex  justify-center mx-3">
                        <Link to={`/productOverview/${item.product.id}`}>
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-16 h-16 md:w-36 md:h-36"
                          />{" "}
                        </Link>
                      </div>
                      <div className="item-detail space-y-2 w-3/6 md:ml-5">
                        <Link to={`/productOverview/${item.product.id}`}>
                          <p className=" text-base font-medium leading-6 text-gray-900">
                            {item.product.title}
                          </p>
                        </Link>
                        <p>{item.product.category}</p>
                        <div className="flex">
                          <p className=" text-sm font-medium leading-6 text-gray-900">
                            Size :{" "}
                          </p>
                          <p>{item.size}</p>
                        </div>
                        <div className="flex">
                          <p className=" text-sm font-medium leading-6 text-gray-900">
                            Color :{" "}
                          </p>
                          <p>{item.color}</p>
                        </div>

                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900 "
                          >
                            Qty
                          </label>
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantity(e, item)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <img
                          src={dustbin}
                          className="w-6 h-6"
                          alt=""
                          onClick={() => handleRemove(item)}
                        />
                      </div>
                      <div className="item-price flex w-2/6  justify-center">
                        <p className=" text-sm font-medium leading-6 text-gray-900">
                          MRP : {item.product.discountPrice}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="summery md:w-1/3">
              <div className=" flex flex-col  my-10 ">
                <h1 className="text-2xl font-semibold ">Summery</h1>
              </div>
              <div className="pricing">
                <div className="subtotal flex justify-between">
                  <h2 className=" text-lg font-medium leading-6 text-gray-900">
                    Subtotal
                  </h2>
                  <h2 className="text-lg">{indiaCurrency} 8399</h2>
                </div>
                <div className="estimagedDeliveryAndHandling flex justify-between">
                  <h2 className=" text-lg font-medium leading-6 border-2  text-gray-900">
                    Estimated Delivery & Handling
                  </h2>
                  <h2 className="text-lg ">{indiaCurrency}1250</h2>
                </div>
                <div className="Total mt-4 flex justify-between">
                  <h2 className=" text-lg font-medium leading-6 border-2  text-gray-900">
                    Total
                  </h2>
                  <h2 className="text-lg ">{indiaCurrency}1250</h2>
                </div>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-3xl my-8 mt-14 md:flex hidden justify-center items-center cursor-pointer hover:opacity-75 ">
                Member Checkout
              </button>
            </div>
          </div>
          <div className="favourites lg:px-48">
            <h1 className="title text-2xl mt-10 mb-3">Favourite</h1>
            <div className="bag-second mb-5 md:flex md:flex-wrap">
              {favouriteItems &&
                favouriteItems.map((item) => (
                  <div className="flex py-4 w-full md:w-1/2  ">
                    <div className="item-img w-1/6 flex  justify-center mx-3">
                      <Link to={`/productOverview/${item.product.id}`}>
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-16 h-16 md:w-28 md:h-28"
                        />{" "}
                      </Link>
                    </div>
                    <div className="item-detail space-y-2 w-3/6">
                      <p className=" text-base font-medium leading-6 text-gray-900">
                        {item.product.title}
                      </p>
                      <p>{item.product.category}</p>
                      <div className="flex">
                        <p className=" text-sm font-medium leading-6 text-gray-900">
                          Size :{" "}
                        </p>
                        <p>{item.size}</p>
                      </div>
                      <div className="flex">
                        <p className=" text-sm font-medium leading-6 text-gray-900">
                          Color :{" "}
                        </p>
                        <p>{item.color}</p>
                      </div>

                      <button
                        className="border-2 rounded-xl border-black px-4 py-2 border-opacity-50"
                        onClick={() => handleCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="item-price flex w-2/6  justify-center">
                      <p className=" text-sm font-medium leading-6 text-gray-900">
                        MRP : {indiaCurrency}
                        {item.product.discountPrice}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="youMightAlsoLike">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl   ">You might also like</h2>
              <div className="slide-buttons flex gap-7  ">
                <div className="left" onClick={() => handleScroll("left")}>
                  <img src={leftArrow} alt="" className="w-4 h-4" />
                </div>
                <div className="right" onClick={() => handleScroll("right")}>
                  <img src={rightArrow} alt="" className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="scroll-container scroll-smooth flex flex-row overflow-x-auto mt-4">
              {productYouMayAlsoLike &&
                productYouMayAlsoLike.map((product, index) => (
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
                          {product.gender}'s {product.category}
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
      ) : null}
    </div>
  );
};

export default ShoppingCart;
{
  /* <Link to={`/productOverview/${product.id}`}>
<div className=" mx-2 text-left">
  <img
    src={product.images[0]}
    className="max-w-[70vw] md:max-w-[30vw]"
    alt=""
  />
  <div className="">
    <p className="text-sm px-2">{product.title}</p>
    <p className="text-sm px-2 opacity-70">
      {product.gender}'s {product.category}
    </p>
    <p className="my-5">
      MRP {indiaCurrency}
      {product.price}
    </p>
  </div>
</div>
</Link> */
}
