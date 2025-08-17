import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SideBar from "../component/sidebar";
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    available: false,
    images: [],
    newImages: [],
  });

  console.log(product);
  

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`
        );
        const { name, category, price, available, image } = response.data;
        setProduct({
          name,
          category,
          price,
          available,
          images: image || [],
          newImages: [],
        });
      } catch (error) {
        toast.error("Error fetching product data");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct((prev) => ({
        ...prev,
        newImages: [...prev.newImages, ...Array.from(files)],
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Remove selected new image before upload
  const handleRemoveNewImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  // Remove existing image
  const handleRemoveExistingImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("available", product.available);
      product.newImages.forEach((file) => formData.append("image", file));

      await axios.patch(`http://localhost:3000/api/v1/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Product updated successfully!");
      navigate("/dashboard/AdminProducts");
    } catch (error) {
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

    <SideBar />

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Modifier le produit</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (DZD)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              min={0}
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* available */}
          <div className="flex  gap-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disponible
            </label>
            <input
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={() => setProduct((prev) => ({ ...prev, available: !prev.available }))}
              className=""
            />
          </div>

          {/* Existing Images */}
          {product.images.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Existing Images</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.images.map((img, i) => (
                  <div key={i} className="relative w-32 h-32">
                    <img
                      src={img}
                      alt={`Product ${i}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label="Remove existing image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* New Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter des images
            </label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-orange-400 transition-colors flex flex-col items-center justify-center"
              onClick={() => document.getElementById("productImages")?.click()}
            >
              <p className="text-gray-400 text-sm mb-2">
                Click or drag images here
              </p>
              <p className="text-gray-300 text-xs">Supports multiple images</p>
            </div>

            <input
              type="file"
              id="productImages"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleChange}
            />

            {product.newImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.newImages.map((file, i) => (
                  <div
                    key={i}
                    className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label="Remove selected image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md mt-4"
          >
            {loading ? "Modification en cours..." : "Modifier"}
          </button>
        </form>
      </main>
    </div>
  );
}
