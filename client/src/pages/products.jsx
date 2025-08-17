import React, { useEffect, useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import searchImage from "../photo/products/searchImage.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Dogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const categories = [
    t("products.categories.all"),
    t("products.categories.dogs"),
    t("products.categories.cats"),
    t("products.categories.birds"),
    t("products.categories.fish"),
    t("products.categories.reptiles")
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/products");        
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-full mx-auto px-6 py-10 flex justify-center flex-col items-center mt-[-100px]">
      {/* Title & Image */}
      <div className="text-center mb-[-15px] flex flex-row items-center justify-center w-[60%] gap-40">
        <h2 className="text-5xl tracking-wide text-shadow-sm text-shadow-gray-500 max-sm:hidden">
          {t("products.title")}
        </h2>
        <img
          src={searchImage}
          alt={t("products.searchImageAlt")}
          className="h-69 m-0 mb-[-30px] object-contain"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-center w-full mb-8">
        <div className="flex items-center mainOrange rounded-full px-5 py-3 w-full max-w-2xl shadow-md">
          <FaSearch className="text-black text-lg mr-3" />
          <input
            type="text"
            placeholder={t("products.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder-white text-white text-sm"
          />
          <div className="border-l border-white pl-3">
            <FaSlidersH className="text-white text-lg cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-l-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 p-2 rounded-full ml-3 text-sm transition-colors ${
              activeCategory === cat
                ? "mainOrange text-white"
                : "text-black hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
        <button className="mainOrange text-black px-3 text-center text-3xl py-1 rounded-full">
          →
        </button>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-15">
          {products.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="rounded-2xl w-[90%] overflow-hidden shadow-lg border border-gray-600 hover:shadow-xl transition-shadow">
                <div className="bg-white flex items-center justify-center p-6">
                  <img
                    src={product.image[0].url}
                    alt={product.name}
                    className="h-40 object-contain"
                  />
                </div>
                <div className="mainOrange text-black p-4">
                  <p className="font-bold text-lg">
                    {product.price} {t("products.currency")}
                  </p>
                  <p className="text-sm leading-snug">{product.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{t("products.noProducts")}</p>
      )}
    </div>
  );
}