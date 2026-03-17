import React, { useState } from "react";
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    icon: assets.apple,
    title: "Up to 10% Off Voucher",
    subtitle: "iPhone 14 Series",
    image: assets.hero,
  },
  {
    id: 2,
    icon: assets.apple,
    title: "Exclusive Deals on Laptops",
    subtitle: "Latest Tech",
    image: assets.AppleLaptop,
  },
  {
    id: 3,
    icon: assets.tshirt,
    title: "Trendy Fashion Collections",
    subtitle: "Men's & Women's Fashion",
    image: assets.Shirt,
  },
  {
    id: 4,
    icon: assets.groceryIcon,
    title: "Home & Lifestyle Essentials",
    subtitle: "Make Your Home Cozy",
    image: assets.Grocery,
  },
];

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="hidden md:block w-[240px]">
        <Sidebar />
      </div>

      {/* Banner */}
      <section className="flex-1 py-6 px-4 md:px-10">
        <div className="relative flex flex-col md:flex-row items-center justify-between bg-black rounded-lg p-6 md:p-10 min-h-[60vh]">
          {/* LEFT CONTENT */}
          <div className="max-w-lg text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img src={currentSlide.icon} alt="icon" className="w-6" />
              <span className="text-gray-300 text-sm">
                {currentSlide.subtitle}
              </span>
            </div>

            <h1 className="text-white text-3xl md:text-5xl font-semibold leading-tight mb-6">
              {currentSlide.title}
            </h1>

            <button onClick={()=> navigate("/products")} className="flex items-center gap-2 text-white border-b border-white hover:text-red-500 transition">
              Shop Now
              <img src={assets.arrow} alt="arrow" className="w-4" />
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src={currentSlide.image}
              alt="banner"
              className="max-h-[300px] object-contain"
            />
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center"
          >
            ❮
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white text-black w-10 h-10 rounded-full flex items-center justify-center"
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainBanner;
