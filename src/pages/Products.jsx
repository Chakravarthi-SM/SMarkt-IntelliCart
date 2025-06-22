import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/Loading4.webm";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import notfound from "../assets/notfound.json";
import Lottie from "lottie-react";
import MobileFilter from "../components/MobileFilter";
const Products = () => {
  const { data, fetchAllProducts } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  // const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };
  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleBrandChange={handleBrandChange}
          handleCategoryChange={handleCategoryChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 ">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />
              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-[500px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[600px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
