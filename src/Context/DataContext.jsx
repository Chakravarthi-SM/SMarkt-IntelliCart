import React, { useEffect } from "react";
import axios from "axios";
import { Children, createContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  //states for the current location
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const [data, setData] = useState();

  //   fetching all products from API

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150"
      );
      const productsData = res.data.products;
      // console.log(productsData);
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  // states for filtering unique categories

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const allCategories = data.map((item) => item.category);
      const uniqueCategories = ["All", ...new Set(allCategories)];
      // console.log(uniqueCategories);
      setCategories(uniqueCategories);
    }
  }, [data]);

  // states for filtering unique brands

  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      const allbrands = data.map((item) => item.brand);
      const uniqueBrand = ["All", ...new Set(allbrands)];
      // console.log(uniqueBrand);
      setBrandData(uniqueBrand);
    }
  }, [data]);

  // function for detecting current location

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await response.json();
          // console.log(data);
          // console.log(
          //   data.address.neighbourhood,
          //   data.address.city,
          //   data.address.country
          // );
          setLocation({
            lat,
            lon,
            place1: data.address.neighbourhood,
            place2: data.address.city,
            place3: data.address.country,
            state: data.address.state,
            postcode: data.address.postcode,
          });
        } catch (err) {
          setError("Failed to fetch location name.");
        }
      },
      () => {
        setError("Permission denied or locationn unavailable.");
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <DataContext.Provider
        value={{
          data,
          setData,
          fetchAllProducts,
          categories,
          brandData,
          location,
          setLocation,
          error,
          setError,
          getLocation,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};
