import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import connectedCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { getDashboardStats } from "./controllers/dashboardController.js";
import { stripeWebhooks } from "./controllers/orderController.js";


const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();
await connectedCloudinary();

const allowedOrigins = ["http://localhost:5173"];

// Stripe webhook (raw body)
app.post("/stripe-webhook", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get("/", (req, res) => res.send("Backend running"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// dashboard
app.use("/api/admin", getDashboardStats);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
