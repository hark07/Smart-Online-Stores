import express from "express";
import authUser from "../middleware/authUser.js";
import authSeller from "../middleware/authSeller.js";
import {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
  getRecentOrders,
  placeOrderStripe,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Place COD order
orderRouter.post("/cod", authUser, placeOrderCOD);

// Get orders for logged-in user
orderRouter.get("/user", authUser, getUserOrders);

// Get all orders for seller/admin
orderRouter.get("/all", authSeller, getAllOrders);

orderRouter.get("/recent", authSeller, getRecentOrders);

// Place Stripe order
orderRouter.post("/stripe", authUser, placeOrderStripe);


export default orderRouter;
