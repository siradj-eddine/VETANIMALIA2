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

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      await axios.delete(`http://localhost:3000/api/v1/products/${id}` , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="flex min-h-full w-[90%] ml-[5%] bg-gray-50">
      <SideBar />

      <main className="flex-1 p-4 md:p-6">
        {/* Header + Add Product */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-0">
            Products Management
          </h3>
          <Link
            to={"/dashboard/AdminProducts/add"}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="w-full mb-6 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Products Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <Link to={`/dashboard/products/${p._id}`} key={p._id}>
            <li
              className="h-[400px] bg-white rounded-2xl shadow-md p-4
               flex flex-col justify-between hover:shadow-xl transition-shadow border border-[var(--mainOrange)]"
            >
                <img src={p?.image[0].url} alt={p?.name} height={200} width={200}
                  className="object-cover h-1/2 w-full" />
                  <hr />
                <div className="h-fit">
                  <h4 className="text-lg font-semibold mb-2">{p.name}</h4>
                  <p className="text-sm text-gray-500 mb-1">Category: {p.category}</p>
                  <p className="text-sm text-gray-500 mb-1">Price: ${p.price}</p>
                <p className="text-sm text-gray-500">Stock: {p.stock}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleDeleteProduct(p._id)}
                  aria-label={`Delete ${p.name}`}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
}
