import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "./../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
    }
  };

  const CartIconWithCount = () => {
    const count = getCartCount();
    return (
      <div
        className="relative cursor-pointer"
        onClick={() => navigate("/cart")}
        aria-label={`Cart with ${count} items`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") navigate("/cart");
        }}
      >
        <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
        {count > 0 && (
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    );
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "hover:text-primary transition";

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
      >
        <img src={assets.Logo1} alt="Logo" className="w-35 h-10 rounded-md" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={navLinkClass}
          onClick={() => setOpen(false)}
        >
          All Product
        </NavLink>
        <NavLink
          to="/about"
          className={navLinkClass}
          onClick={() => setOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={navLinkClass}
          onClick={() => setOpen(false)}
        >
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            aria-label="Search products"
          />
          <img
            src={assets.search_icon}
            className="w-6 opacity-80"
            alt="Search icon"
            aria-hidden="true"
          />
        </div>

        <CartIconWithCount />

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="User profile"
              tabIndex={0}
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40">
              <li
                className="p-2 pl-4 hover:bg-primary/10 cursor-pointer"
                onClick={() => navigate("/my-account")}
                tabIndex={0}
              >
                My Account
              </li>
              <li
                className="p-2 pl-4 hover:bg-primary/10 cursor-pointer"
                onClick={() => navigate("/my-orders")}
                tabIndex={0}
              >
                My Orders
              </li>
              <li
                className="p-2 pl-4 hover:bg-primary/10 cursor-pointer"
                onClick={logout}
                tabIndex={0}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Icons */}
      <div className="flex items-center gap-6 md:hidden">
        <CartIconWithCount />

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="sm:hidden"
        >
          <img src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50"
        >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/my-account"
            onClick={() => setOpen(false)}
            className={navLinkClass}
          >
            My Account
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className={navLinkClass}
          >
            All Product
          </NavLink>
          {user && (
            <NavLink
              to="/my-orders"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className={navLinkClass}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className={navLinkClass}
          >
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
