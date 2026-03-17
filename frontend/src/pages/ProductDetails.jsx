import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  // Set related products
  useEffect(() => {
    if (products.length > 0 && product) {
      let productCopy = products.filter((item) => item._id !== product._id);

      // Get same category first
      let sameCategory = productCopy.filter(
        (item) => item.category === product.category
      );

      // If less than 5, add products from other categories
      if (sameCategory.length < 5) {
        const others = productCopy.filter(
          (item) => item.category !== product.category
        );
        sameCategory = [...sameCategory, ...others];
      }

      setRelatedProducts(sameCategory.slice(0, 5));
    }
  }, [products, product]);

  // Set default thumbnail
  useEffect(() => {
    setThumbnail(product?.images[0] || null);
  }, [product]);

  if (!product) return null;

  return (
    <div className="mt-12">
      {/* ---------- Breadcrumb ---------- */}
      <p>
        <Link to={"/"}>Home</Link> / <Link to={"/products"}> Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-primary">{product.name}</span>
      </p>

      {/* ---------- Product Info Section ---------- */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border border-gray-500/30 rounded overflow-hidden cursor-pointer w-24 h-24 md:w-24 md:h-24 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 rounded overflow-hidden w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src={thumbnail}
              alt="Selected product"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="text-sm w-full md:w-1/2">
          <h2 className="text-2xl font-medium">{product.name}</h2>

          {/* Ratings */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star_icon"
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          {/* Price */}
          <div className="mt-4">
            <p className="text-gray-500/70 line-through">
              MRP: {currency} {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency} {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-4">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              disabled={!product.inStock}
              onClick={() => addToCart(product._id)}
              className={`w-full py-3.5 font-medium transition ${
                product.inStock
                  ? "bg-gray-100 text-gray-800/80 hover:bg-gray-200"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
            <button
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className={`w-full py-3.5 font-medium transition ${
                product.inStock
                  ? "bg-primary text-white hover:bg-primary-dull"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Related Products ---------- */}
      <div className="flex items-center flex-col mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {relatedProducts.map((prod, index) => (
            <ProductCard key={index} product={prod} inStock={prod.inStock} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded-md text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;