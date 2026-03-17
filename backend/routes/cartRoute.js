import express from "express";
import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const router = express.Router();

// Update user cart
router.post("/update", authUser, updateCart);

export default router;
