import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Puppy Food With Chicken", price: 135, stock: 50, category: "Dogs" },
    { id: 2, name: "Dog Food With Lamb", price: 48, stock: 80, category: "Dogs" },
    { id: 3, name: "Dog Treats", price: 25, stock: 200, category: "Dogs" },
    { id: 4, name: "Cat Food Salmon", price: 32, stock: 150, category: "Cats" },
    { id: 5, name: "Bird Seed Mix", price: 18, stock: 120, category: "Parrots" },
  ]);

  const [searchTerm,] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [addProduct, setAddProduct] = useState({ name: "", price: "", stock: "", category: "" });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleAddProduct = () => {
    if (addProduct.name && addProduct.price && addProduct.stock) {
      const newProduct = {
        id: products.length + 1,
        name: addProduct.name,
        category: addProduct.category,
        price: Number(addProduct.price),
        stock: Number(addProduct.stock),
      };
      setProducts([...products, newProduct]);
      setAddProduct({ name: "", price: "", stock: "", category: "" });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSaveEdit = () => {
    setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
  };

  return (
    <div className="bg-white min-h-full rounded-xl shadow-sm border border-gray-100 overflow-hidden ml-18 max-sm:ml-0">
      <SideBar/>
      {/* Header + Add Form */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg md:text-xl font-semibold">Products Management</h3>
          <div className="mt-4 md:mt-0 grid grid-cols-2 md:flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={addProduct.name}
              onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })}
              className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder="Category"
              value={addProduct.category}
              onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })}
              className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={addProduct.price}
              onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })}
              className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <input
              type="number"
              placeholder="Stock"
              value={addProduct.stock}
              onChange={(e) => setAddProduct({ ...addProduct, stock: e.target.value })}
              className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md text-xs md:text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
            <button
              className="col-span-2 md:col-span-1 bg-orange-400 hover:bg-orange-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{p.category}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${p.price}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{p.stock}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-orange-400 hover:text-orange-600"
                      onClick={() => setEditProduct({ ...p })}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => handleDeleteProduct(p.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-gray-50 rounded-lg shadow p-4">
            <h4 className="font-bold text-lg">{p.name}</h4>
            <p className="text-sm text-gray-600">Category: {p.category}</p>
            <p className="text-sm text-gray-600">Price: ${p.price}</p>
            <p className="text-sm text-gray-600">Stock: {p.stock}</p>
            <div className="flex space-x-3 mt-3">
              <button
                className="text-orange-400 hover:text-orange-600"
                onClick={() => setEditProduct({ ...p })}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => handleDeleteProduct(p.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold">Edit Product</h2>
            </div>
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400 text-xs md:text-sm"
              />
              <input
                type="text"
                value={editProduct.category}
                onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400 text-xs md:text-sm"
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400 text-xs md:text-sm"
              />
              <input
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400 text-xs md:text-sm"
              />
            </div>
            <div className="p-4 md:p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                className="px-3 md:px-4 py-2 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 md:px-4 py-2 bg-orange-400 text-white rounded-md text-xs md:text-sm font-medium hover:bg-orange-500"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
