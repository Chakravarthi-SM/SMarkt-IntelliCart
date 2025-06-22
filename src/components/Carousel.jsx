import React, { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  // console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} cursor-pointer z-10`}
      >
        <div
          className="flex items-center justify-center w-12 h-12 
                   hover:scale-125 transition-all duration-300 ease-out"
          style={{
            position: "absolute",
            left: "50px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {/* Custom Chevron Arrow */}
          <div
            className="w-4 h-4 border-l-4 border-b-4 border-white/40 
                     transform rotate-[45deg] 
                     hover:border-white hover:scale-110
                     transition-all duration-300 ease-out"
          />
        </div>
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} cursor-pointer z-10`}
      >
        <div
          className="flex items-center justify-center w-12 h-12 
                   hover:scale-125 transition-all duration-300 ease-out"
          style={{
            position: "absolute",
            right: "50px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {/* Custom Chevron Arrow */}
          <div
            className="w-4 h-4 border-r-4 border-b-4 border-white/40 
                     transform rotate-[-45deg] 
                     hover:border-white hover:scale-110
                     transition-all duration-300 ease-out"
          />
        </div>
      </div>
    );
  };

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };
  return (
    <>
      {!data || data.length === 0 ? (
        <div
          className="flex justify-center items-center h-screen w-full 
        bg-gradient-to-br from-[#667eea] to-[#764ba2]"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="text-white text-xl mt-4">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          <Slider {...settings}>
            {data?.slice(0, 7)?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#667eea] to-[#764ba2] relative "
                >
                  <div className="flex flex-col md:flex-row  my-22 md:my-0 gap-10 justify-center items-center h-[580px] px-4">
                    <div className=" space-y-3 md:space-y-6">
                      <h3 className="text-black-500 font-semibold font-sans text-base">
                        Powering Your World with the Best in Electronics
                      </h3>
                      <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white">
                        {item.title}
                      </h1>
                      <p className="md:w-[500px] line-clamp-3 text-gray-100 pr-7 ">
                        {item.description}
                      </p>
                      <button
                        onClick={() => {
                          navigate("/products");
                        }}
                        className="bg-white text-purple-700 font-bold rounded-xl px-4 py-2 mt-2
                        hover:scale-95 hover:shadow-xl border-2 border-transparent hover:border-purple-300
                        cursor-pointer  relative pointer-events-auto"
                      >
                        SHOP NOW
                      </button>
                    </div>
                    <div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-full w-[500px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Carousel;
