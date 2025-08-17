import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import cat from "../photo/imgs/cat-removebg-preview (1) 2.png";
import { useCart } from "../Context/cartContext";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, setCart } = useCart();
  const {t} = useTranslation();
  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>{
        if(item.quantity > 1) {
          return item._id === id
          ? { ...item, quantity: item.quantity - 1}
          : item
        }else{
          return item;
        }
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = cart.length > 0 ? 600 : 0;
  const total = subtotal + deliveryFee;

  return (
     <main
      className="mx-auto max-w-6xl px-6 py-10"
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      <div className="flex flex-row justify-between mx-8 items-center">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">
          {t("cart.title")}
        </h1>
        <img src={cat} alt="" className="w-[8%] max-lg:hidden" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* LEFT: list of items */}
        <section>
          {cart.length ? (
            <div className="overflow-x-auto">
              <header className="grid grid-cols-4 border-b-4 border-gray-600 pb-3 font-semibold text-center">
                <div>{t("cart.headers.name")}</div>
                <div>{t("cart.headers.quantity")}</div>
                <div>{t("cart.headers.price")}</div>
                <div className="text-right">{t("cart.headers.remove")}</div>
              </header>

              <div>
                {cart.map((it) => (
                  <article
                    key={`${it._id}`}
                    className="grid grid-cols-4 border-gray-400 items-center"
                  >
                    <div className="flex items-center py-4">
                      {it.image && (
                        <img
                          src={it.image[0].url}
                          alt={it.name}
                          className="w-12 h-12 object-contain "
                        />
                      )}
                      <span className="font-medium text-gray-800 mx-8">
                        {it.name}
                      </span>
                    </div>

                    <div className="flex justify-center py-4">
                      <IconButton onClick={() => decrementQty(it._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <span className="mx-2 border-2 px-8 border-orange-400 rounded-full">
                        {it.quantity}
                      </span>
                      <IconButton onClick={() => incrementQty(it._id)}>
                        <AddIcon />
                      </IconButton>
                    </div>

                    <div className="text-right py-4 font-medium text-gray-700">
                      {it.price * it.quantity} {t("cart.currency")}
                    </div>

                    <div className="flex justify-center">
                      <IconButton onClick={() => removeItem(it._id)}>
                        <DeleteIcon className="text-red-500 hover:text-red-700" />
                      </IconButton>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="mb-2 text-gray-600">{t("cart.emptyMessage")}</p>
              <Link to="/" className="text-orange-500 hover:underline">
                {t("cart.continueShopping")}
              </Link>
            </div>
          )}
        </section>

        {/* RIGHT: summary */}
        <aside className="bg-gray-50 border-2 border-orange-400 rounded-3xl p-6 lg:sticky lg:top-24 shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex justify-center text-gray-800">
            {t("cart.summary.title")}
          </h3>
          <hr className="my-3" />

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span>{t("cart.summary.orderTotal")}</span>
              <span className="font-medium">{subtotal} {t("cart.currency")}</span>
            </div>

            <div className="flex justify-between">
              <span>{t("cart.summary.delivery")}</span>
              <span className="font-medium">+{deliveryFee} {t("cart.currency")}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="font-semibold">{t("cart.summary.total")}</span>
              <span className="font-semibold text-lg text-gray-800">
                {total} {t("cart.currency")}
              </span>
            </div>
          </div>

          <button
            disabled={!cart.length}
            className={`w-full py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all ${
              !cart.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Link to="/checkout">
              {t("cart.checkoutButton")} ({cart.length} {t(`cart.item${cart.length !== 1 ? "s" : ""}`)})
            </Link>
          </button>

          <div className="mt-4 text-center text-sm">
            <Link to="/products" className="text-orange-500 hover:underline">
              {t("cart.continueShopping")}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}