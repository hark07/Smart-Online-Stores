import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [searchQuery, setSearchQuery] = useState({});

  // Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // Fetch User Auth Status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);

        // Use backend cart only, ignore localStorage
        setCartItems(data.user.cartItems || {});

        // Clear localStorage to avoid stale cart
        localStorage.removeItem("cartItems");
      } else {
        setUser(null);
        setCartItems({});
        localStorage.removeItem("cartItems");
      }
    } catch {
      setUser(null);
      setCartItems({});
      localStorage.removeItem("cartItems");
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Sync cart with backend
  const syncCartWithBackend = async (updatedCart) => {
    if (!user) return;
    try {
      const { data } = await axios.post("/api/cart/update", {
        cartItems: updatedCart,
      });
      if (!data.success) toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Cart functions
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    syncCartWithBackend(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    syncCartWithBackend(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      setCartItems(cartData);
      localStorage.setItem("cartItems", JSON.stringify(cartData));
      syncCartWithBackend(cartData);
      toast.success("Removed from Cart");
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += product.offerPrice * cartItems[id];
    }
    return Math.floor(total * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
