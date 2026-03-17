import React, { useState, useMemo } from "react";
import { assets } from "../../assets/assets"; // your local fallback asset

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const normalizeUrl = (img) => {
  if (!img) return null;
  if (typeof img !== "string") return null;
  // already absolute
  if (img.startsWith("http") || img.startsWith("//")) return img;
  // ensure leading slash
  return img.startsWith("/") ? `${backendURL}${img}` : `${backendURL}/${img}`;
};

const ViewProduct = ({ product, onClose }) => {
  // Build safe images array (map to full URLs)
  const images = useMemo(() => {
    if (
      !product?.images ||
      !Array.isArray(product.images) ||
      product.images.length === 0
    ) {
      return [assets.upload_area]; // fallback single image
    }
    return product.images.map((img) => normalizeUrl(img) || assets.upload_area);
  }, [product]);

  const [selected, setSelected] = useState(images[0]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-transparent flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-lg max-w-5xl w-full p-6 grid grid-cols-[auto_1fr] gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left thumbnails */}
        <div className="flex flex-col gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(img)}
              className={`w-20 h-20 p-1 rounded overflow-hidden ${
                selected === img ? "ring-2 ring-primary" : "border-gray-200"
              }`}
              type="button"
            >
              <img
                src={img}
                alt={`${product.name} thumb ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = assets.upload_area;
                }}
              />
            </button>
          ))}
        </div>

        {/* Right: main image + info */}
        <div className="flex gap-6">
          <div className="flex-1 border border-primary rounded p-4 flex items-center justify-center">
            <img
              src={selected}
              alt={product.name}
              className="max-h-[420px] w-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = assets.upload_area;
              }}
            />
          </div>

          {/* Product info column */}
          <div className="w-80">
            <h2 className="text-2xl font-semibold mb-2">
              Name: {product.name}
            </h2>

            <div className="mb-4">
              <div className="flex items-center gap-2">
                {/* sample stars */}
                <div className="flex items-center gap-0.5">
                  <h2 className="text-2xl font-semibold">Rating:</h2>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <img
                        key={i}
                        src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                        alt="star"
                        className="md:w-3.5 w-3"
                      />
                    ))}
                  <p>(4)</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-lg font-medium">
                <h2 className="text-2xl font-semibold">
                  Price: MRP: {product.offerPrice} &nbsp;
                  <sapn className=" text-gray-500 line-through">
                    {product.price}
                  </sapn>
                </h2>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-2xl font-medium">Description</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                {(product.description || []).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
