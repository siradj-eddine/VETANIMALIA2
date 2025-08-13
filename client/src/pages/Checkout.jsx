import Box from "@mui/material/Box";
import{useState , useEffect} from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import dog from "../photo/imgs/dog-removebg-preview 2.png";
import { useCart } from "../Context/cartContext";
import Wilayas from "../wilayas.js"
import axios from "axios";
import {toast} from "sonner";
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
          "& .MuiInputLabel-root": { color: error ? "error.main" : "text.secondary" },
          "& .MuiInputLabel-root.Mui-focused": { color: "orange" },
          "& .MuiInput-underline:after": { borderBottomColor: "orange" },
          ...sx,
        }}
      />
    </Box>
  </div>
);


const SelectFieldWithIcon = ({
  label,
  value,
  onChange,
  error,
  icon: Icon,
  options,
}) => {
  const labelId =`${label.replace(/\s+/g, "-").toLowerCase()}-label`;
  const selectId = `${label.replace(/\s+/g, "-").toLowerCase()}-select`;
  return (
    <div className="space-y-2">
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Icon sx={{ color: "action.active", mr: 1, my: 2 }} />
        <FormControl variant="standard" fullWidth error={!!error}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "orange" },
            "& .MuiInput-underline:after": { borderBottomColor: "orange" },
          }}
        >
          <InputLabel id={labelId}>{label}</InputLabel>
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("Adrar");
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);

  const {cart , setCart} = useCart()

    const deliveryFee = 600;
    useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(subtotal);
  }, [cart]);

  
async function addOrder() {
  // Format cart to match: [{ product: "...", quantity: ... }, ...]
  const productsFormatted = cart.map(item => ({
    product: item._id, // Assuming your cart items have _id
    quantity: item.quantity || 1
  }));

  const orderData = {
    products: productsFormatted,
    adress: address,
    phoneNb: phoneNumber,
    willaya: selectedWilaya,
    totalAmount: total + deliveryFee
  };

  try {
    await axios.post("http://localhost:3000/api/v1/orders" , orderData);

    // Reset form state
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setAddress("");
    setSelectedWilaya("Adrar");
    setErrors({});
    setTotal(0);
    setCart([]);
    setTotal(0);
    toast.success("Order created successfully!");
  } catch (error) {
      toast.error("Error creating order");  
  }
}


  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1
        className="pl-8 mb-8 text-4xl"
        style={{ zIndex: "10", fontFamily: "'Kiwi Maru', serif" }}
      >
        Checkout
      </h1>

      <img src={dog} alt="" className="absolute xl:right-25 2xl:right-50 lg:right-10 lg:top-44 xl:top-35 w-[10%] z-10 max-lg:hidden" />

      <div className="gap-10 flex justify-between items-center max-md:flex-col-reverse
       max-w-[100%] max-md:max-w-[100%]">
        {/* LEFT: contact form */}
        <form className="space-y-10">
          <section className="md:min-w-[100%] lg:min-w-[120%]">
            <h2
              className="mb-4 text-lg font-semibold"
              style={{ fontFamily: "'Kiwi Maru', serif" }}
            >
              1. Contact Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputFieldWithIcon
                label="First Name"
                icon={AccountCircle}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <InputFieldWithIcon
                label="Last Name"
                icon={AccountCircle}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <InputFieldWithIcon
                label="Phone Number"
                icon={PhoneIcon}
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <SelectFieldWithIcon
                label="La Wilaya"
                icon={LocationOnIcon}
                options={Wilayas.map((wilaya) => wilaya.name)}
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
              />
            </div>

            <Box sx={{ mt: 1 }}>
              <InputFieldWithIcon
                label="Address"
                icon={LocationOnIcon}
                placeholder="Address"
                sx={{ width: { xs: "100%" }, mx: { xs: 0 } }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>{/* Delivery companies */}
            <h3
              className="text-lg font-semibold mt-6"
              style={{ fontFamily: "'Kiwi Maru', serif" }}
            >
              2. Delivery Companies
            </h3>
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {["Yalidine", "DHD", "ZR express", "SARL express"].map((company) => (
                <Button
                  key={company}
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    padding: "8px 20px",
                    textTransform: "capitalize",
                    border: "1px solid #F97316",
                    color : "black"
                  }}
                >
                  {company}
                </Button>
              ))}
            </Box>

            {/* Delivery method */}
            <h3
              className="text-lg font-semibold mt-6"
              style={{ fontFamily: "'Kiwi Maru', serif" }}
            >
              3. Delivery Method
            </h3>
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {["Home", "The office"].map((method) => (
                <Button
                  key={method}
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    padding: "8px 20px",
                    textTransform: "capitalize",
                    border: "1px solid #F97316",
                    color : "black"
                  }}
                >
                  {method}
                </Button>
              ))}
            </Box>
          </section>
        </form>

        {/* RIGHT: items + totals */}
        <aside className="rounded-3xl border-2 border-orange-300 p-6 w-[90%] lg:sticky
         lg:top-24 flex flex-col justify-between max-w-[35%] max-md:min-w-[100%]">
          <h3 className="mb-6 text-3xl font-semibold text-center drop-shadow-sm">
            {cart.length} Items
          </h3>

          <div className="flex flex-col gap-3 justify-between">
            {cart.map((item) => 
            <div className="flex gap-5">
              <img src={item.image[0].url} alt={item.name} width={70} className="border border-orange-500 rounded-lg"/>
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-zinc-500">Quantity : {item.quantity}</span>
                  <span className="text-sm text-green-500 flex"><p className="text-zinc-500 mr-1">Total :</p> {item.price * item.quantity} DZD</span>
              </div>
            </div>
            )}
          </div>

          <hr className="my-4 border-zinc-300" />

          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{total} DZD</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Delivery Service</span>
              <span className="font-medium">{deliveryFee} DZD</span>
            </li>
          </ul>

          <hr className="my-4 border-zinc-300" />

          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-3xl max-sm:text-2xl font-semibold ml-3">Total : </span>
            <span className="text-3xl max-sm:text-2xl font-semibold">{total +deliveryFee} DZD</span>
          </div>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="w-full md:w-auto rounded-full bg-orange-400 px-[30%] py-3 font-semibold text-black hover:opacity-90 flex items-center justify-center mx-[15%]"
              onClick={addOrder}
            >
              Order
            </button>
          </Box>
        </aside>
      </div>
    </main>
  );
}