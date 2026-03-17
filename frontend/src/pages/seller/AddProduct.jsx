import React, { useEffect, useState } from "react";
import { categories, assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = ({ existingProduct = null, onCancel }) => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const { axios } = useAppContext();

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || "");
      setDescription((existingProduct.description || []).join("\n"));
      setCategory(existingProduct.category || "");
      setPrice(existingProduct.price || "");
      setOfferPrice(existingProduct.offerPrice || "");
      setPreviewImages(existingProduct.images || []);
      setFiles([]);
    } else {
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setOfferPrice("");
      setFiles([]);
      setPreviewImages([]);
    }
  }, [existingProduct]);

  const handleFileChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);

    const updatedPreviews = [...previewImages];
    updatedPreviews[index] = URL.createObjectURL(e.target.files[0]);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      let response;
      if (existingProduct) {
        // Update product
        formData.append("id", existingProduct._id);
        response = await axios.put("/api/product/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Add new product
        response = await axios.post("/api/product/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
      <div>
        <p className="text-base font-medium">Product Images</p>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  accept="image/*"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleFileChange(e, index)}
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={previewImages[index] || assets.upload_area}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.path}>
            {cat.text}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2 w-full">
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
        />
        <input
          type="number"
          placeholder="Offer Price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          required
          className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 w-full"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary text-white rounded"
        >
          {existingProduct ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-2.5 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
