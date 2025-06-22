import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { data, categories, brandData } = useContext(DataContext);

  return (
    <>
      <div className="bg-gray-100 mt-10 px-4 roundemd h-max hidden md:block">
        <input
          type=" text"
          value={search}
          placeholder="Search..."
          className="bg-white  p-2 rounded-md border-2 border-gray-400 "
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* filter by category */}

        <h1 className="mt-5 font-semibold text-xl">Category</h1>

        <div className="flex flex-col gap-2 mt-3">
          {categories?.map((item, index) => {
            return (
              <div key={index} className="flex gap-2 font-semibold">
                <input
                  type="checkbox"
                  name={item}
                  value={item}
                  checked={category === item}
                  onChange={handleCategoryChange}
                />
                <button className="cursor-pointer uppercase">{item}</button>
              </div>
            );
          })}
        </div>

        {/* filter by Brand */}

        <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
        <select
          name=""
          id=""
          value={brand}
          onChange={handleBrandChange}
          className="bg-white w-full p-2 border-gray-200 border-2 rounded-md "
        >
          {brandData?.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>

        {/* filterby the Price Range */}

        <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>

        <div className="flex flex-col gap-4 ">
          <label htmlFor="">
            Price Range : ${priceRange[0]} - ${priceRange[1]}
          </label>
          {/* <input type="range" /> */}
          <input
            type="range"
            min="0"
            max="5000"
            name=""
            id=""
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="transition-all"
          />
        </div>

        <button
          className="bg-red-500 px-3 py-2 text-lg rounded-md text-white cursor-pointer font-semibold hover:bg-red-400 mt-5 mb-5 "
          onClick={() => {
            setSearch("");
            setCategory("All");
            setBrand("All");
            setPriceRange([0, 5000]);
          }}
        >
          Reset Filters
        </button>
      </div>
      ;
    </>
  );
};

export default FilterSection;
