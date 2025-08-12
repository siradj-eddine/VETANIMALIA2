// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { categories as ALL_CATEGORIES} from "../data/products";
import axios from "axios";

export default function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [gallery, setGallery] = useState([]);



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        setGallery(response.data.product.image);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* categories row (optional) */}
      <div className="flex flex-wrap justify-start items-center gap-3 border-l-4 border-zinc-300 pl-4 sm:pl-6">
        <div className="flex flex-wrap gap-3 overflow-x-auto scrollbar-hide">
          {ALL_CATEGORIES?.map((c) => (
            <span
              key={c}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${
                c === product?.category ? "bg-orange-300 text-black shadow" : ""
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-[28px]">
        {product?.name}
      </h1>
      
      {/* top section: thumbs | main image | info+price */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* LEFT: thumbs + main image */}
        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2">
          {/* Thumbnails - horizontal on mobile, vertical on md+ */}
          <div className="flex gap-4 md:flex-col order-2 md:order-1">
            {product?.image.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentImgIdx(idx)}
                className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 rounded-2xl border transition ${
                  currentImgIdx === idx
                    ? "border-black ring-2 ring-black"
                    : "border-zinc-300 hover:border-zinc-400"
                }`}
              >
                <img
                  src={img.url}
                  alt="thumb"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex items-center justify-center order-1 md:order-2 flex-1">
            <img
              src={gallery[currentImgIdx]?.url}
              alt={product?.name}
              className="max-h-[320px] w-auto object-contain"
            />
          </div>
        </div>
        
        {/* RIGHT: info + price card */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6">
          
          {/* price card - full width on mobile, half on md+ */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl border-2 border-zinc-300 p-5 sticky top-4">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                khgku
              </div>
              <div className="mt-2 text-sm">Free Delivery</div>

              <button
                // onClick={addToCart}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-orange-300 px-4 py-2 font-medium text-black hover:opacity-90"
              >
                <FiShoppingCart /> Add To Cart
              </button>

              <button
                // onClick={buyNow}
                className="mt-3 w-full rounded-md border-2 border-orange-300 px-4 py-2 font-semibold hover:bg-orange-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="my-8 h-[2px] w-full bg-gradient-to-r from-orange-300 to-orange-300/30" />
      
      {/* More of our products (same category preferred) */}
      <section className="mt-12">
        <h3 className="mb-6 text-xl sm:text-2xl font-bold">More of Our Products</h3>
        
        <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          kljkjp
        </div>
      </section>
    </main>
  );
}