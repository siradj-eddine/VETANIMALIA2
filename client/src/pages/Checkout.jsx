
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import dog from "../photo/imgs/dog-removebg-preview 2.png";
import { useCart } from "../Context/cartContext";
import Wilayas from "../wilayas.js";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const InputFieldWithIcon = ({
  label,
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  type = "text",
  sx,
}) => (
  <div className="space-y-2">
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ color: "action.active", mr: 0.5, mt: 2 }} />
      <TextField
        label={label}
        variant="standard"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        fullWidth
        error={!!error}
        helperText={error}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: error ? "error.main" : "text.secondary",
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "orange" },
          "& .MuiInput-underline:after": { borderBottomColor: "orange" },
          ...sx,
        }}
      />
    </Box>
  </div>
);

const SelectFieldWithIcon = ({
  labelKey,
  value,
  onChange,
  error,
  icon: Icon,
  options,
  idBase = "select",
}) => {
  const { t } = useTranslation();
  const labelId = `${idBase}-label`;
  const selectId = `${idBase}-select`;

  return (
    <div className="space-y-2">
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Icon sx={{ color: "action.active", mr: 1, my: 2 }} />
        <FormControl
          variant="standard"
          fullWidth
          error={!!error}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "orange" },
            "& .MuiInput-underline:after": { borderBottomColor: "orange" },
          }}
        >
          <InputLabel id={labelId}>{t(labelKey)}</InputLabel>
          <Select
            labelId={labelId}
            id={selectId}
            value={value}
            onChange={onChange}
            displayEmpty
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default function Checkout() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("Adrar");
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState("");
  const methods = [t("checkout.deliveryMethod1"), t("checkout.deliveryMethod2")];

  const { cart, setCart } = useCart();

  const deliveryFee = 600;

  useEffect(() => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(subtotal);
  }, [cart]);

  async function addOrder() {
    const productsFormatted = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity || 1,
    }));

    const orderData = {
      name: `${firstName} ${lastName}`,
      products: productsFormatted,
      adress: address,
      phoneNb: phoneNumber,
      willaya: selectedWilaya,
      totalAmount: total + deliveryFee,
      deliveryMethod: selectedMethod,
    };

    try {
      await axios.post("http://localhost:3000/api/v1/orders", orderData);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setAddress("");
      setSelectedWilaya("Adrar");
      setErrors({});
      setTotal(0);
      setCart([]);
      toast.success(t("checkout.successMessage"));
    } catch (error) {
      toast.error(t("checkout.errorMessage"));
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <div className="flex flex-row justify-between mx-8 items-center">
        <h1
          className="pl-8 mb-4 text-4xl"
          style={{ zIndex: "10", fontFamily: "'Kiwi Maru', serif" }}
        >
          {t("checkout.title")}
        </h1>

        <img
          src={dog}
          alt={t("checkout.dogImageAlt")}
          className="w-[14%] z-10 "
        />
      </div>

      <div className="gap-10 flex justify-between items-start  max-md:flex-col-reverse max-w-[100%] max-md:max-w-[100%]">
        {/* LEFT: contact form */}
        <form className="space-y-10">
          <section className="md:min-w-[100%] lg:min-w-[120%]">
            <h2
              className="mb-4 text-lg font-semibold"
              style={{ fontFamily: "'Kiwi Maru', serif" }}
            >
              1. {t("checkout.contactInfo")}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputFieldWithIcon
                label={t("checkout.firstName")}
                icon={AccountCircle}
                placeholder={t("checkout.firstNamePlaceholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <InputFieldWithIcon
                label={t("checkout.lastName")}
                icon={AccountCircle}
                placeholder={t("checkout.lastNamePlaceholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <InputFieldWithIcon
                label={t("checkout.phoneNumber")}
                icon={PhoneIcon}
                placeholder={t("checkout.phonePlaceholder")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <SelectFieldWithIcon
                labelKey="checkout.wilaya"
                icon={LocationOnIcon}
                options={Wilayas.map((w) => w.name)}
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                idBase="wilaya"
              />
            </div>

            <Box sx={{ mt: 1 }}>
              <InputFieldWithIcon
                label={t("checkout.address")}
                icon={LocationOnIcon}
                placeholder={t("checkout.addressPlaceholder")}
                sx={{ width: { xs: "100%" }, mx: { xs: 0 } }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

                        {/* Delivery method */}
            <h3
              className="text-lg font-semibold mt-6"
              style={{ fontFamily: "'Kiwi Maru', serif" }}
            >
              3. Delivery Method
            </h3>
            <br />
<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {methods.map((method) => (
        <label
          key={method}
          style={{
            border: "1px solid #F97316",
            borderRadius: "50px",
            padding: "8px 20px",
            textTransform: "capitalize",
            cursor: "pointer",
            backgroundColor:
              selectedMethod === method ? "#F97316" : "transparent",
            color: selectedMethod === method ? "#fff" : "#000",
            transition: "all 0.2s ease",
          }}
        >
          <input
            type="radio"
            name="deliveryMethod"
            value={method}
            checked={selectedMethod === method}
            onChange={(e) => setSelectedMethod(e.target.value)}
            style={{ display: "none" }}
            required
          />
          {method}
        </label>
      ))}
    </div>
          </section>
        </form>

        {/* RIGHT: items + totals */}
        <aside className="rounded-3xl border-2 border-orange-300 p-6 w-[90%] lg:sticky lg:top-24 flex flex-col justify-between max-w-[35%] max-md:min-w-[100%]">
          <h3 className="mb-6 text-3xl font-semibold text-center drop-shadow-sm">
            {cart.length}{" "}
            {t(`checkout.${cart.length !== 1 ? "items" : "item"}`)}
          </h3>

          <div className="flex flex-col gap-3 justify-between">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-5">
                <img
                  src={item.image[0].url}
                  alt={item.name}
                  width={70}
                  className="border border-orange-500 rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-zinc-500">
                    {t("checkout.quantity")}: {item.quantity}
                  </span>
                  <span className="text-sm text-green-500 flex">
                    <p className="text-zinc-500 mr-1">{t("checkout.total")}:</p>
                    {item.price * item.quantity} {t("checkout.currency")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4 border-zinc-300" />

          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>{t("checkout.subtotal")}</span>
              <span className="font-medium">
                {total} {t("checkout.currency")}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>{t("checkout.deliveryService")}</span>
              <span className="font-medium">
                {deliveryFee} {t("checkout.currency")}
              </span>
            </li>
          </ul>

          <hr className="my-4 border-zinc-300" />

          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-3xl max-sm:text-2xl font-semibold ml-3">
              {t("checkout.total")}:
            </span>
            <span className="text-3xl max-sm:text-2xl font-semibold">
              {total + deliveryFee} {t("checkout.currency")}
            </span>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="rounded-full bg-orange-400 px-8 py-3 font-semibold text-black hover:opacity-90 flex items-center justify-center w-full md:w-auto"
              onClick={addOrder}
            >
              {t("checkout.orderButton")}
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
