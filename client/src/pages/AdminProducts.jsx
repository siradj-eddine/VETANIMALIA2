import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addProduct, setAddProduct] = useState({ name: "", category: "", price: "", stock: "" });

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter Products when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="bg-white min-h-full rounded-xl shadow-sm border border-gray-100 overflow-hidden ml-18 max-sm:ml-0">
      <SideBar />

      {/* Header + Add Form */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg md:text-xl font-semibold">Products Management</h3>
            <Link to={"/dashboard/AdminProducts/add"} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md">
              Add Product
            </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-4">{p.name}</td>
                <td className="px-4 py-4">{p.category}</td>
                <td className="px-4 py-4">${p.price}</td>
                <td className="px-4 py-4">{p.stock}</td>
                <td className="px-4 py-4 flex space-x-2">
                  <button
                    className="text-orange-400 hover:text-orange-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-600"
                    onClick={() => handleDeleteProduct(p.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
