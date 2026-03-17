import React, { useEffect, useState } from "react";
import {
  HiUser,
  HiLocationMarker,
  HiHeart,
  HiClipboardList,
  HiLogout,
} from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { assets } from "./../assets/assets";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Account = () => {
  const { axios } = useAppContext();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user/profile", {
          withCredentials: true,
        });
        if (data.success) setUser(data.user);
      } catch (error) {
        toast.error(error.message || "Failed to fetch user");
      }
    };
    fetchUser();
  }, [axios]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual save logic here if needed
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="bg-white shadow-md rounded-xl border border-gray-100">
          <div className="flex flex-col items-center py-6 px-4">
            <img
              src={assets.profile_icon}
              alt="User"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
            />
            <h2 className="text-lg sm:text-xl font-semibold mt-3 text-center">
              {user.name}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              {user.email}
            </p>
          </div>

          <div className="border-t">
            {/* Active Menu Item */}
            <div className="relative bg-gray-100 rounded-lg">
              <div className="absolute left-0 top-0 h-full w-1 rounded-r bg-red-500"></div>
              <button className="flex items-center gap-3 px-4 py-4 text-gray-800 w-full text-sm sm:text-base">
                <HiUser className="text-red-500 text-lg sm:text-xl" />
                <span>My Profile</span>
              </button>
            </div>

            <div className="space-y-1 p-2 mt-1">
              <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg text-sm sm:text-base">
                <HiLocationMarker className="text-lg sm:text-xl" />
                <span>Address</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg text-sm sm:text-base">
                <HiHeart className="text-lg sm:text-xl" />
                <span>My List</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg text-sm sm:text-base">
                <HiClipboardList className="text-lg sm:text-xl" />
                <NavLink to="/my-orders">My Orders</NavLink>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg text-sm sm:text-base">
                <HiLogout className="text-lg sm:text-xl" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 sm:p-8 border border-gray-100">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-semibold">My Profile</h2>

            <button className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
              CHANGE PASSWORD
            </button>
          </div>

          <hr className="mb-6" />

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-full sm:max-w-3xl mx-auto"
          >
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-600 font-semibold text-sm sm:text-base">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="text-gray-600 font-semibold text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="text-gray-600 font-semibold text-sm sm:text-base">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  className="w-full mt-1 px-4 py-3 border rounded-md focus:outline-none"
                  readOnly
                />
                <span
                  className="absolute right-4 top-[45px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full sm:w-auto mt-3 px-6 py-3 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 text-sm sm:text-base"
            >
              SAVE PROFILE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
