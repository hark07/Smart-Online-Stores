import express from "express";
import authUser from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controllers/addressContoller.js";

const addressRouter = express.Router();

// Add new address (POST)
addressRouter.post("/add", authUser, addAddress);

// Get user's addresses (GET)
addressRouter.get("/get", authUser, getAddress);

export default addressRouter;
