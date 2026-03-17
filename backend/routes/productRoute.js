import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";

import {
  addProduct,
  changeStock,
  productById,
  productDelete,
  productList,
  productUpdate,
} from "../controllers/productController.js";

const productRouter = express.Router();

// Correct Multer field: "images"
productRouter.post("/add", authSeller, upload.array("images", 10), addProduct);

productRouter.get("/list", productList);

productRouter.post("/id", productById);

productRouter.post("/stock", authSeller, changeStock);

productRouter.put("/update", authSeller, upload.array("images", 10), productUpdate);

productRouter.delete("/delete/:id", authSeller, productDelete);

export default productRouter;
