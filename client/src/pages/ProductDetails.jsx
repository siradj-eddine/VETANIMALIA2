
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/cartContext";
import { CiShoppingCart } from "react-icons/ci";
import catImage from "../photo/imgs/cat-removebg-preview (1) 2.png" ;
import { toast } from "sonner";
import {useTranslation} from "react-i18next";
export default function ProductDetails() {
  const {t} = useTranslation();
  const { id } = useParams();
  const { addToCart , cart} = useCart(); 
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    available: false,
    image: [],
  });

  let [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`
        );
        setGallery(response.data.product.image);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    if (quantity > 0) {
      addToCart(product, quantity);
      toast.success(t("productDetails.addedToCart"));
    } else {
      toast.error(t("productDetails.error"));
    }
  }
  

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 overflow-x-hidden">
      <h1 className="mt-6 text-2xl tracking-tight sm:text-3xl md:text-[28px] max-lg:text-center">
        {product?.name}
      </h1>

      {/* top section */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8" key={product._id}>
        {/* LEFT */}
        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2 items-center justify-center 
        md:translate-x-[-20px] min-lg:translate-x-[70px]">
          {/* Thumbnails */}
          <div className="flex gap-4 md:flex-col order-2 md:order-1 max-md:justify-center">
            {product?.image.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setCurrentImgIdx(idx)}
                className={`h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 rounded-2xl border transition ${
                  currentImgIdx === idx
                    ? "border-zinc-300 ring-1 ring-orange-500"
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
          <div className="flex items-center justify-center order-1 md:order-2 flex-1 md:mr-25 md:max-w-fit">
            <img
              src={gallery[currentImgIdx]?.url}
              alt={product?.name}
              className="max-h-[320px] w-auto object-contain border-orange-500 border rounded-4xl p-4"
            />
          </div>
        </div>

            <hr className="w-[80%] ml-[10%] min-lg:hidden"/>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6 items-center">
          <div className="space-y-3 text-sm w-full md:w-1/2 max-md:ml-[20%] overflow-x-hidden">
            <span className="flex"><p className="font-bold mr-1">Description : </p>{product.description}</span>
            <p><span className="font-bold">Category :</span> {product.category}</p>
            <span className="flex"><p className="font-bold mr-1">ID : </p>{product._id}</span>
          </div>

            <hr className="w-[80%] ml-[10%] min-md:hidden"/>

          {/* Price Card */}
          <div className="w-full md:w-1/2">
          <img src={catImage} alt="cat" height={80} width={80} className="ml-[35%] z-0 max-lg:hidden -mt-28
            translate-y-4" />
            <div className="rounded-2xl border-2 border-[var(--mainOrange)] p-5 sticky top-4
             min-lg:bg-white z-10 ">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight w-full text-center">
                Prix : {product?.price * quantity} DZD
              </h1>

              {/* Quantity Selector */}
              <div className="mt-3">
                <label className="text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full border rounded p-2"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md mainOrange px-4 py-2 font-medium text-black hover:opacity-90"
              >
                <CiShoppingCart size={22}/> Ajouter au Panier
              </button>

                <button onClick={() => {
                  if(cart.length > 0) {
                   return
                  }else {
                    handleAddToCart();
                  }
                }} className="mt-3 w-full rounded-md border-2 border-orange-300 px-4 py-2 font-semibold hover:bg-orange-50">
                  <Link to="/checkout">Procéder au Paiement</Link>
                  </button>
            </div>
          </div>
        </div>
      </div>
        <hr className="w-[80%] ml-[10%] my-10"/>
    </main>
  );
}
