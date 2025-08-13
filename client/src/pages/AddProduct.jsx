import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [available, setAvailable] = useState(true);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 10));
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("available", available);
      images.forEach((image) => {
        formData.append("image", image); 
      });
      await axios.post("http://localhost:3000/api/v1/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImages([]);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 p-4 rounded-t-lg">
        Add New Product
      </h1>
      <form
        onSubmit={addProduct}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-zinc-300"
      >
        {/* Name & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg px-3 py-2 focus:outline-none ring-1 focus:ring-orange-400"
          />
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <span>{available ? "Available" : "Not Available"}</span>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 mb-1">
            Product Images ({images.length}/10 max)
          </label>

          {/* Custom file upload button */}
          <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-orange-400 rounded-lg cursor-pointer text-orange-500 hover:bg-orange-50 transition">
            <span className="text-sm">Click or drag files to upload</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Previews */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-400 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
