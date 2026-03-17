import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { FiBox } from "react-icons/fi";

const Order = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4">
        <h2 className="text-lg font-medium mb-4">Orders List</h2>

        {/* Scrollable container */}
        <div className="max-h-[75vh] overflow-y-auto space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col  md:items-center md:flex-row gap-5 justify-between p-5 w-full rounded-md border border-gray-300"
            >
              <div className="flex gap-5 max-w-100 relative">
                <div className="">
                  <FiBox size={100}/>
                </div>
                <div className="flex flex-col">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="font-medium">
                      {item.product.name}{" "}
                      <span
                        className={`text-primary ${
                          item.quantity < 2 ? "hidden" : ""
                        }`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  <p>
                    {order.address.state}, {order.address.zipcode},{" "}
                    {order.address.country}{" "}
                  </p>
                  <p> {order.address.phone}</p>
                </p>
              </div>

              <p className="font-medium text-lg my-auto">
                {currency}
                {order.amount}
              </p>

              <div className="flex flex-col text-sm md:text-base text-black/60">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No orders available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
