import User from "../models/User.js";

// Update user cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;

    if (!cartItems) return res.json({ success: false, message: "Cart data missing" });

    const user = await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.json({ success: true, message: "Cart updated successfully", cartItems: user.cartItems });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
