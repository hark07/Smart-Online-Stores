import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, user, axios } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user", {
        withCredentials: true,
      });
      if (data.success) setMyOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 w-full">
      {/* Header */}
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Orders List */}
      {myOrders.map((order, orderIndex) => (
        <div
          key={orderIndex}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 w-full"
        >
          {/* Order Summary */}
          <h4 className="flex justify-between text-[18px] md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span className="truncate">Order Id: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </h4>

          {/* Order Items */}
          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`relative bg-white text-gray-500/70 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full ${
                itemIndex !== order.items.length - 1
                  ? "border-b border-gray-300"
                  : ""
              }`}
            >
              {/* Product Info */}
              <div className="flex items-center mb-4 md:mb-0">
                <div className="border rounded-lg">
                  <img
                    src={
                      Array.isArray(item.product.images)
                        ? item.product.images[0]
                        : item.product.images
                    }
                    className="w-16 h-16"
                    alt={item.product.name} 
                  />
                </div>
                <div className="ml-4 max-w-[200px]">
                  <h2 className="text-sm font-medium text-gray-800">
                    {item.product.name }
                  </h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-gray-600">
                <p>Quantity: {item.quantity || 1}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Item Amount */}
              <p className="text-primary text-lg font-medium">
                Amount: {currency}
                {item.product.offerPrice * (item.quantity || 1)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
