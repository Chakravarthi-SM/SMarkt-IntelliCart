import React, { useContext } from "react";
import { useCart } from "../Context/CartContet";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { DataContext } from "../Context/DataContext";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, deleteItem, updateQuantity } = useCart();
  const { location, getLocation, setLocation, error, setError } =
    useContext(DataContext);
  // console.log(location);

  const { user } = useUser();
  // console.log(user);

  const navigate = useNavigate();

  const totalPrice = cartItem.reduce((total, item) => total + item.price, 0);
  return (
    <>
      <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
        {cartItem.length > 0 ? (
          <div>
            <h1 className="font-bold text-2xl">My Cart({cartItem.length})</h1>
            <div className="mt-10 ">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h20 rounded-md "
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2">
                          {item.title}
                        </h1>
                        <p className="text-re500 font-semibold text-lg">
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => {
                          console.log("button clicked");
                          updateQuantity(cartItem, item.id, "increase");
                        }}
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl">
                      <FaRegTrashAlt
                        className="text-red-500 text-2xl cursor-pointer"
                        onClick={() => deleteItem(item.id)}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2  md:gap-20">
              <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name : </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={user.fullName}
                    className="border-2 border-gray-400 rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address : </label>
                  <input
                    type="text"
                    value={location.place1}
                    placeholder="Enter your address..."
                    className="border-2 border-gray-400 rounded-md p-2"
                  />
                </div>

                <div className="flex w-full gap-5 ">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State :</label>
                    <input
                      type="text"
                      placeholder="Enter your state "
                      value={location.state}
                      className="rounded-md p-2 w-full border-2 border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">PostCode :</label>
                    <input
                      type="text"
                      value={location.postcode}
                      placeholder="Enter your Post Code "
                      className="rounded-md p-2 w-full border-2 border-gray-400"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-5 ">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country :</label>
                    <input
                      type="text"
                      value={location.place3}
                      placeholder="Enter your country "
                      className="rounded-md p-2 w-full border-2 border-gray-400"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No :</label>
                    <input
                      type="text"
                      placeholder="Enter your number "
                      className="rounded-md p-2 w-full border-2 border-gray-400"
                    />
                  </div>
                </div>
                <button
                  className="bg-red-500
                   text-white rounded-md cursor-pointer px-3 py-1 mt-3 hover:bg-red-400"
                >
                  Submit
                </button>

                <div
                  className="flex items-center justify-center w-full text-gray-700
                "
                >
                  ---------OR----------
                </div>
                <div className="flex justify-center ">
                  <button
                    className="bg-red-500 text-white px-3
                   py-2 hover:bg-red-400 rounded-md cursor-pointer"
                    onClick={getLocation}
                  >
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border-gray-100 rounded-md  shadow-xl p-7 h-max mt4 space-y-2">
                <h1 className="text-gray-800 font-bold text-xl ">
                  Bill Details
                </h1>

                <div className="flex justify-between items-center ">
                  <h1 className="flex gap-1 items-center text-gray-700 ">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>
                  <p>${totalPrice}</p>
                </div>

                <div className="flex justify-between items-center ">
                  <h1 className="flex gap-1 items-center text-gray-700 ">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$25</span>FREE
                  </p>
                </div>

                <div className="flex justify-between items-center ">
                  <h1 className="flex gap-1 items-center text-gray-700 ">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Handling Charge
                  </h1>
                  <p className="text-red-500 font-semibold">$5</p>
                </div>

                <hr className="text-gray-200 mt-2" />

                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-lg">Grand Total</h1>
                  <p className="font-semibold text-lg">${totalPrice + 5}</p>
                </div>

                <div>
                  <h1 className="font-semibold text-gray-700 mb-3 mt-7 ">
                    Apply Promo code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full border-gray-400 border"
                    />
                    <button className="bg-white text-black border hover:bg-red-400 border-gray-200 px-4 cursor-pointer py-1 rounded-md ">
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  className="bg-red-500
                 px-3 py-2 rounded-md hover:bg-red-400 cursor-pointer w-full text-white font-semibold mt-3"
                >
                  Procced to CheckOut
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
            <h1 className="text-red-500/80 font-bold text-5xl text-muted">
              Oh no! Your cart is empty
            </h1>
            <img src={emptyCart} alt="" className="w-[400px]" />
            <button
              onClick={() => navigate("/products")}
              className="bg-red-500 text-white px-3 py-2  hover:bg-red-400 rounded-md cursor-pointer "
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
