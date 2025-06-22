import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContet";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();

  // console.log(cartItem);

  return (
    <>
      <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max">
        <img
          src={product.image}
          alt=""
          className="bg-gray-100 aspect-square cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        <h1 className="font-semibold line-clamp-1 px-4 py-1">
          {product.title}
        </h1>

        <p className="my-1 text-lg text-gray-800 font-bold px-4 py-1">
          ${product.price}
        </p>

        <button
          className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-red-400 mb-2"
          onClick={() => addToCart(product)}
        >
          <IoCartOutline className="w-6 h-6" />
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
