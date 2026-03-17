import React from "react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {/* Left Large Banner */}
      <div className="flex-1 bg-green-100 rounded-xl p-6 relative flex flex-col justify-center overflow-hidden">
        <span className="bg-green-200 text-green-800 px-3 py-1 text-xs rounded-full inline-block mb-4 max-w-80">
          NEWS Free Shipping on Orders Above $50!
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Gadgets you'll <span className="text-green-600">love</span>. <br />
          Prices you'll <span className="text-green-600">trust</span>.
        </h1>

        <p className="text-lg md:text-xl font-medium mb-6">
          Starts from <span className="font-bold">$4.90</span>
        </p>

        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg w-max hover:bg-gray-800 transition">
          LEARN MORE
        </button>

        {/* Main Product Image */}
        <div className="absolute bottom-0 right-0 w-48 md:w-80 lg:w-96 h-48 md:h-80 lg:h-96 flex items-end justify-end">
          <img
            src={assets.hero_model_img}
            alt="Main Banner"
            className="w-full h-full object-contain hover:scale-105 transition"
          />
        </div>
      </div>

      {/* Right Small Banners */}
      <div className="flex flex-col gap-4 flex-shrink-0">
        <div className="bg-yellow-100 rounded-xl p-4 flex items-center justify-between w-full h-28 md:h-32">
          <div>
            <h2 className="text-lg font-medium">Best products</h2>
            <p className="text-sm text-gray-600">View more →</p>
          </div>
          <img
            src={assets.hero_product_img1}
            alt="Best Product"
            className="w-20 h-20 md:w-24 md:h-24 object-contain hover:scale-105 transition"
          />
        </div>

        <div className="bg-blue-100 rounded-xl p-4 flex items-center justify-between w-full h-28 md:h-32">
          <div>
            <h2 className="text-lg font-medium">20% discounts</h2>
            <p className="text-sm text-gray-600">View more →</p>
          </div>
          <img
            src={assets.hero_product_img2}
            alt="Discount Product"
            className="w-20 h-20 md:w-24 md:h-24 object-contain hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;