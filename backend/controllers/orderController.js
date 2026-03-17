import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

// Place COD Order  : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    

    // Create order
    const newOrder = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    // Clear user's cart in DB
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Stripe Order
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let amount = 0;
    const lineItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      amount += product.offerPrice * item.quantity;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.offerPrice,
        },
        quantity: item.quantity,
      });
    }

    const newOrder = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: true,
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId,
      },
    });

    res.json({ success: true, url: session.url, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Webhook
export const stripeWebhooks = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, userId } = session.metadata;

    // Mark order as paid
    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    // Clear user's cart
    await User.findByIdAndUpdate(userId, { cartItems: {} });
  }

  res.json({ received: true });
};


// Get Orders for Logged-in User
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders (Admin/Seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// // Get Recent Orders : getRecentOrders
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("items.product", "name category images offerPrice");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};