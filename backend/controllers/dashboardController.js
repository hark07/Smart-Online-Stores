import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // SUM total revenue from `amount` field
    const revenueData = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
