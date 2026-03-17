import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import Orders from "./pages/Orders";
import SellerLogin from "./components/seller/sellerLogin";
import SellerLayout from "./pages/seller/sellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Order from "./pages/seller/Order";
import Loading from "./components/Loading";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Dashboard from "./pages/seller/Dashboard";
import ChatBoat from "./components/ChatBoat";
import About from "./pages/About";
import User from "./pages/seller/User";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Login /> : null}

        <Toaster position="top-center" reverseOrder={false} />
        <div
          className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<Orders />} />
            <Route path="/loader" element={<Loading />} />
            <Route path="/my-account" element={<Account />} />

            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogin />}
            > 
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="order" element={<Order />} />
              <Route path="user" element={<User />} />
            </Route>
          </Routes>
        </div>
        {!isSellerPath && <ChatBoat />}
        {!isSellerPath && <Footer />}
      </div>
    </>
  );
}

export default App;
