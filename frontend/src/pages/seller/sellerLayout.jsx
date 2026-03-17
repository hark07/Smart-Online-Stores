import React from "react";
import { useAppContext } from "../../context/AppContext";
import { NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrAdd } from "react-icons/gr";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { LuBox } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LuLayoutDashboard size={20} />,
    },
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: <GrAdd size={20} />,
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: <AiOutlineUnorderedList size={20} />,
    },
    { name: "Orders", path: "/seller/order", icon: <LuBox size={22} /> },
    { name: "User List", path: "/seller/user", icon: <FaRegUser size={20} /> },
  ];

  // Make logout async
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-blue-600">Smart </span>
            <span className="text-purple-600">Online Store</span>
          </h2>
        </div>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-pr/10 border-primary text-pretty"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`
              }
            >
              {React.isValidElement(item.icon) ? (
                <span className="w-7 h-7 flex items-center justify-center">
                  {item.icon}
                </span>
              ) : (
                <img src={item.icon} alt={item.name} className="w-7 h-7" />
              )}
              <p className="md:block hidden text-center text-[18px]">
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
