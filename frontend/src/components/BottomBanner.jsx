import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const BottomBanner = () => {
  const { currency } = useAppContext();

  return (
    <div className="w-full py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 hidden">
      {/* Top Selling */}
      <div>
        <h2 className="text-2xl  mb-2">Top Selling</h2>
        <div className="h-1 w-24 bg-green-300 mb-4"></div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Watch} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Smart Watch with Bluetooth
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 1300
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 1530
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Phone} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Apple iPhone 15
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 59999
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 60000
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.macbook_image} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Apple Macbook M1
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 123500
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 126000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div>
        <h2 className="text-2xl  mb-2">Trending Products</h2>
        <div className="h-1 w-24 bg-green-300 mb-4"></div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Sari} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Bandhani Printed Embroidered Saree
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 4500
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 5500
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Shoes} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Bandhani Printed Embroidered Saree
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 4500
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 5500
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Shirt} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Men Opaque Casual Shirt
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 1450
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 1650
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added */}
      <div>
        <h2 className="text-2xl  mb-2">Recently Added</h2>
        <div className="h-1 w-24 bg-green-300 mb-4"></div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Monitor} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Dell 27 Monitor S2725H IPS Full HD
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 25000
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 27000
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Appliances} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                TV Appliances
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 55000
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 65000
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-22 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Headphone} className="w-full h-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Headphones
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 2100
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 2299
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Rated */}
      <div>
        <h2 className="text-2xl  mb-2">Top Rated</h2>
        <div className="h-1 w-24 bg-green-300 mb-4"></div>
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Mac} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Apple Macbook Air M4
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 226000
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 230000
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.Watch} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Smart Watch with Bluetooth
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 1300
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 1530
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 rounded-md border border-gray-400 items-center hover:scale-105">
              <img src={assets.macbook_image} className="w-full" />
            </div>
            <div>
              <p className="font-medium text-gray-700 leading-tight text-sm">
                Apple Macbook M1
              </p>
              <div className="flex items-center gap-1 mt-1">
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_icon} className="text-sm w-3" />
                <img src={assets.star_dull_icon} className="text-sm w-3" />
                <p className=" text-sm text-gray-400">(4)</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-green-500 font-semibold text-sm">
                  {currency} 123500
                </span>
                <span className="text-gray-400 line-through text-sm">
                  {currency} 126000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
