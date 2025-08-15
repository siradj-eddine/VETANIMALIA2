import React from "react";
import Home from "./pages/Home.jsx";
import Navbar from "./component/Navbar.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import OurServices from "./pages/OurServices.jsx";
import Login from "./pages/login.jsx";
import RendezVous from "./pages/rendezVous.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./component/footer.jsx";
import Products from "./pages/products.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Orders from "./pages/Orders.jsx";
import Appointments from "./pages/Appointments.jsx";
import Reservations from "./pages/Reservations.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Cart from "./pages/Cart.jsx";
import EditProduct from "./pages/AdminEditProduct.jsx";
import Checkout from "./pages/Checkout.jsx";
import { Route, Routes } from "react-router-dom";
import CatHotel from "./pages/CatHotel";
import SignUp from "./pages/SignUp.jsx";
import "./i18n/config";
import {Toaster} from "sonner";
import AdminProductDetails from "./pages/AdminProductDetails.jsx";
import ProtectedRouteFail from "./pages/protectedRouteFail.jsx";
import NotAuthenticated from "./pages/NotAuthenticated.jsx";
function App() {
  return (
    <>
      <Navbar />
        <Toaster position="top-center" richColors closeButton />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RendezVous" element={<RendezVous />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cat-hotel-reservation" element={<CatHotel />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/not-authenticated" element={<NotAuthenticated />} />
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteFail>
              <Dashboard />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/AdminProducts"
          element={
            <ProtectedRouteFail>
              <AdminProducts />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/Orders"
          element={
            <ProtectedRouteFail>
              <Orders />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/Users"
          element={
            <ProtectedRouteFail>
              <Users />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/Appointments"
          element={
            <ProtectedRouteFail>
              <Appointments />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/Reservations"
          element={
            <ProtectedRouteFail>
              <Reservations />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/AdminProducts/add"
          element={
            <ProtectedRouteFail>
              <AddProduct />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/AdminProducts/edit/:id"
          element={
            <ProtectedRouteFail>
              <EditProduct />
            </ProtectedRouteFail>
          }
        />
        <Route
          path="/dashboard/products/:id"
          element={
            <ProtectedRouteFail>
              <AdminProductDetails />
            </ProtectedRouteFail>
          }
        />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
