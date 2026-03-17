import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";

import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openAddProductForm = () => {
    setEditingProduct(null);
    setShowAddProduct(true);
  };

  const openEditProductForm = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const handleSuccess = () => {
    closeForm();
    fetchProducts();
  };

  const openViewProduct = (product) => setViewingProduct(product);
  const closeViewProduct = () => setViewingProduct(null);

  if (showAddProduct) {
    return (
      <div className="p-6">
        <button
          onClick={closeForm}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dull mb-4"
        >
          Back to Product List
        </button>

        <AddProduct
          existingProduct={editingProduct}
          onSuccess={handleSuccess}
          onCancel={closeForm}
        />
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">All Products</h2>
          <button
            onClick={openAddProductForm}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Add New Product
          </button>
        </div>

        <div className="flex flex-col items-center max-w-full w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <span className="max-sm:hidden w-full">
                      {product.name.split(" ").length > 8
                        ? product.name.split(" ").slice(0, 8).join(" ") + " ..."
                        : product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 truncate">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency} {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer gap-3">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary-dull transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => openViewProduct(product)}
                        className="text-green-500 hover:text-primary-dull transition"
                        title="View"
                      >
                        <FaEye size={20} />
                      </button>
                      <button
                        onClick={() => openEditProductForm(product)}
                        className="text-primary hover:text-blue-500 transition"
                        title="Edit"
                      >
                        <CiEdit size={20} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-primary hover:text-red-500 transition"
                        title="Delete"
                      >
                        <MdOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewingProduct && (
        <ViewProduct product={viewingProduct} onClose={closeViewProduct} />
      )}
    </div>
  );
};

export default ProductList;
