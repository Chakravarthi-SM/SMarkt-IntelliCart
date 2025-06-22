import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../Context/CartContet";
import { DataContext } from "../Context/DataContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { location, setLocation, error, setError } = useContext(DataContext);

  //states for the dropdown and detect location

  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const { cartItem } = useCart();

  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <div
        className="bg-white py-3 shadow-lg shadow-black/200 px-4 md:px-0  z-50"
        //className="fixed top-0 left-0 w-full bg-white py-3 shadow-lg px-4 md:px-0 z-50"
      >
        <div className="max-w-6xl mx-auto  flex justify-between items-center">
          {/* {logo section} */}
          <div className="flex gap-7 items-center">
            <Link to="/">
              <h1 className="font-bold text-4xl">
                <span className="text-red-500  font-serif">SM</span>arkt
              </h1>
            </Link>
            <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden">
              <MapPin className="text-red-500" />
              {/* <span className="font-semibold">
                {location ? ` ${location.place1}, ` : "Add Address"}

                <span className="font-semibold">
                  {location ? `  ${location.place2},${location.place3} ` : ""}
                </span>
              </span> */}
              <div className="font-semibold  w-[150px]">
                {location ? (
                  <>
                    <p>{`${location.place1},`}</p>
                    <p>{` ${location.place2},${location.place3}`}</p>
                  </>
                ) : (
                  "Add Address"
                )}
              </div>

              {/* <FaCaretDown onClick={toggleDropdown} /> */}

              <FaCaretDown onClick={() => setOpenDropdown(!openDropdown)} />
            </div>

            {openDropdown ? (
              <>
                <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
                  <h1 className="font-semibold  mb-4 text-xl flex justify-between">
                    Change Location
                    <span className="cursor-pointer" onClick={toggleDropdown}>
                      <CgClose />
                    </span>
                  </h1>
                  <button
                    onClick={toggleDropdown}
                    className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400
                  "
                  >
                    Detect my location
                  </button>
                </div>
              </>
            ) : null}
          </div>
          {/* menu section */}
          <nav className="flex gap-7 items-center">
            <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Products</li>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-3 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Contact</li>
              </NavLink>
            </ul>
            <div className="flex gap-17 justify-between items-center">
              <Link to="/cart" className="relative">
                <IoCartOutline className="h-7 w-7" />
                <span className="bg-red-500 px-1.5 rounded-full -top-3 -right-3 text-white absolute text-sm">
                  {cartItem.length}
                </span>
              </Link>
              <div className="hidden md:block">
                <SignedOut>
                  <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>

            {openNav ? (
              <HiMenuAlt3
                onClick={() => setOpenNav(false)}
                className="h-7 w7  md:hidden"
              />
            ) : (
              <HiMenuAlt1
                onClick={() => setOpenNav(true)}
                className="h-7 w7  md:hidden"
              />
            )}
          </nav>
        </div>
        <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
      </div>
    </>
  );
};

export default Navbar;
