import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { LuBox } from "react-icons/lu";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { axios, currency } = useAppContext();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  // For Dashboard
  const fetchStats = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard-stats", {
        withCredentials: true,
      });

      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // For Recent Orders
  const fetchRecentOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/recent", {
        withCredentials: true,
      });

      if (data.success) {
        setRecentOrders(data.orders);
      }
    } catch (error) {
      console.log("Recent Orders Error:", error.message);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="min-h-screen bg-gray-100 p-4 w-full cursor-pointer">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6 mt-4">
          {/* Total Users */}
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Link to="/seller/user"><FiUsers size={22} /></Link>
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500">Total Users</span>
              <h4 className="mt-2 text-xl font-bold">{stats.totalUsers}</h4>
            </div>
          </div>

          {/* Total Orders */}
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Link to="/seller/order"><LuBox size={22} /></Link>
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500">Total Orders</span>
              <h4 className="mt-2 text-xl font-bold">{stats.totalOrders}</h4>
            </div>
          </div>

          {/* Total Products */}
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Link to="/seller/product-list"><FaShoppingCart size={22} /></Link>
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500">Total Products</span>
              <h4 className="mt-2 text-xl font-bold">{stats.totalProducts}</h4>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <FaMoneyBillWave size={22} />
            </div>
            <div className="mt-5">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <h4 className="mt-2 text-xl font-bold">
                {currency} {stats.totalRevenue}
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm mt-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          {/* Scrollable container if orders > 3 */}
          <div
            className={`overflow-y-auto ${
              recentOrders.length > 3 ? "max-h-96" : "max-h-full"
            }`}
          >
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-left border-b border-gray-200">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) =>
                  order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={item?.product?.images?.[0] || "/placeholder.png"}
                          alt={item?.product?.name || "Unknown Product"}
                          className="w-12 h-12 rounded object-cover border"
                        />

                        <span>
                          {item?.product?.name
                            ? item.product.name.split(" ").length > 10
                              ? item.product.name
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ") + "..."
                              : item.product.name
                            : "Unknown Product"}
                        </span>
                      </td>

                      <td className="p-3">
                        {item?.product?.category || "N/A"}
                      </td>

                      <td className="p-3">
                        {currency} {item?.product?.offerPrice ?? 0}
                      </td>

                      <td className="p-3">
                        <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
