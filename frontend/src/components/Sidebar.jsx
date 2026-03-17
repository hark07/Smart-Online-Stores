import React from "react";
import { NavLink } from "react-router-dom";
import { categories } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[250px] min-h-[63vh] relative py-2 border-r border-gray-300">
      <div className="flex flex-col">
        {categories.map((item, index) => (
          <NavLink
            key={index}
            to={`/products/${item.path}`}
            className={({ isActive }) =>
              `relative py-3 text-sm font-medium px-2 transition-all
              ${
                isActive
                  ? "text-gray-500 font-semibold"
                  : "text-black hover:text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.text}

                {/* Active Right Border */}
                {isActive && (
                  <span className="absolute right-0 top-0 h-full w-[3px] bg-black"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
