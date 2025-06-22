import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const allCategories = data.map((item) => item.category);
      const uniqueCategories = [...new Set(allCategories)];
      // console.log(uniqueCategories);
      setCategories(uniqueCategories);
    }
  }, [data]);

  return (
    <>
      <div
        className="bg-gradient-to-b from-[#764ba2] via-[#553c9a] to-[#3d2c73]"
        //className="bg-gradient-to-br from-[#667eea]/20 via-[#764ba2]/30 to-[#553c9a]/40 backdrop-blur-sm uppercase"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-5 px-4">
          {categories.map((item, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => navigate(`/category/${item}`)}
                  // className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-md cursor-pointer px-3 py-1 mt-2 hover:scale-105"
                  className="bg-white uppercase text-purple-700 font-bold rounded-xl px-3 py-1 mt-1
                         hover:scale-95 hover:shadow-xl border-2 border-transparent hover:border-purple-300
                        !cursor-pointer"
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Category;
