import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// ================================
// Add Product
// ================================
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      images: imagesUrl,
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================================
// List Products
// ================================
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================================
// Get Product By ID
// ================================
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================================
// Change Stock
// ================================
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================================
// Update Product
// ================================
export const productUpdate = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json({ success: false, message: "Product ID required" });

    const existingProduct = await Product.findById(id);
    if (!existingProduct) return res.json({ success: false, message: "Product not found" });

    const updateData = JSON.parse(req.body.productData);

    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const upload = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return upload.secure_url;
        })
      );

      updateData.images = [...existingProduct.images, ...newImages];
    } else {
      updateData.images = existingProduct.images; // keep old images
    }

    await Product.findByIdAndUpdate(id, updateData, { new: true });

    res.json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ================================
// Delete Product
// ================================
export const productDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.json({ success: false, message: "Product ID required" });

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
