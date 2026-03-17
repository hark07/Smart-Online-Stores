import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    navigate,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Generate cart array from cartItems & products
  useEffect(() => {
    const arr = Object.keys(cartItems)
      .map((key) => {
        const product = products.find((p) => p._id === key);
        if (product) return { ...product, quantity: cartItems[key] };
        return null;
      })
      .filter(Boolean);
    setCartArray(arr);
  }, [cartItems, products]);

  // Fetch user addresses
  useEffect(() => {
    const getUserAddress = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get("/api/address/get", {
          withCredentials: true,
        });
        if (data.success) {
          setAddress(data.addresses);
          if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getUserAddress();
  }, [user]);

  // Place order
  const placeOrder = async () => {
    if (!user) return toast.error("Please login to place order");
    if (!selectedAddress) return toast.error("Please select an address");
    if (!cartArray || cartArray.length === 0)
      return toast.error("Your cart is empty");

    try {
      const orderItems = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: orderItems,
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          localStorage.removeItem("cartItems");
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else if (paymentOption === "Online") {
        const { data } = await axios.post("/api/order/stripe", {
          items: orderItems,
          address: selectedAddress._id,
        });

        if (data.success) {
          // Redirect to Stripe checkout
          window.location.href = data.url;
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Clear cart after returning from Stripe payment-success page
  useEffect(() => {
    if (window.location.pathname === "/payment-success") {
      setCartItems({});
      localStorage.removeItem("cartItems");
      toast.success("Payment successful! Your cart has been cleared.");
    }
  }, []);

  if (!user)
    return <p className="mt-16 text-center">Please login to view your cart</p>;
  if (!products.length || !cartItems) return null;

  return (
    <div className="flex flex-col md:flex-row mt-16 gap-6">
      {/* Left Section */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium py-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>Weight: {product.weight || "N/A"}</p>
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                    >
                      {Array(10)
                        .fill(0)
                        .map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {(product.offerPrice * product.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove_icon"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            className="group-hover:-translate-x-1 transition"
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      {/* Right Section */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 mt-6 md:mt-0 border border-gray-300/70 relative">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address Section */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer ml-0"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-6 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {address.map((addr, idx) => (
                  <p
                    key={idx}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Price Summary */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
