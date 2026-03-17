import React, { useRef } from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Categories = () => {
  const { navigate } = useAppContext();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      if (direction === "left") {
        scrollRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between">
        <p className="text-2xl md:text-3xl font-medium">Categories</p>
        <div className="flex items-center gap-4">
          <IoIosArrowRoundBack
            onClick={() => scroll("left")}
            size={40}
            className="text-gray-500 bg-gray-100 rounded-full hover:bg-primary-dull hover:text-white transition cursor-pointer"
          />
          <IoIosArrowRoundForward
            onClick={() => scroll("right")}
            size={40}
            className="text-gray-500 bg-gray-100 rounded-full hover:bg-primary-dull hover:text-white transition cursor-pointer"
          />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 mt-6 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center min-w-[150px]"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              className="w-28 group-hover:scale-110 transition"
              alt={category.text}
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


