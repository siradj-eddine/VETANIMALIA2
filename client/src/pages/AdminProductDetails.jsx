import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProduct(response.data.product);

        // Default to first image
        if (response.data.product?.image?.length > 0) {
          setSelectedImage(response.data.product.image[0].url);
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/dashboard/AdminProducts");
      toast.success("Produit supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression du produit");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-orange-600">Product Details</h1>
          <Link
            to="/dashboard/admin-products"
            className="text-sm text-orange-500 hover:underline"
          >
            Back to Products
          </Link>
        </div>

        <div className="flex space-x-8">
          {/* Image gallery */}
          <div className="w-1/3">
            {/* Main Image */}
            <div className="mb-4 bg-gray-200 rounded-xl h-80 flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product?.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 ease-in-out"
                />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product?.image?.map((img, index) => (
                <div
                  key={index}
                  className={`bg-gray-200 rounded-lg h-24 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden 
                  ${selectedImage === img.url ? "ring-2 ring-orange-500" : ""}`}
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img
                    src={img.url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product?.name}</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{product?.description}</p>
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              {product?.category}
            </div>

            <div className="text-sm text-gray-600 mb-6">
              <span className="font-semibold text-gray-800">Product ID:</span>{" "}
              {product?._id}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-semibold text-orange-600">
                {product?.price} DZD
              </span>
            </div>

            {/* Admin actions */}
            <div className="flex space-x-6">
              <Link
                to={`/dashboard/AdminProducts/edit/${product?._id}`}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
              >
                Edit Product
              </Link>
              <button
                onClick={() => handleDeleteProduct(product?._id)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              >
                Remove Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
