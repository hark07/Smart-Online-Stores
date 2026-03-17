import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate, setCartItems, removeItem } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      // Clear cart after successful payment
      setCartItems({});
      localStorage.removeItem("cartItems");

      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000); // redirect after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [nextUrl, navigate, setCartItems, removeItem]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loading;
