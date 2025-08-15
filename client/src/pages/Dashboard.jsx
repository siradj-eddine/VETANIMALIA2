import React, { useState, useEffect } from "react";
import { FaDollarSign, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import SideBar from "../component/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [latestAppointments, setLatestAppointments] = useState([]);

  const [userStats, setUserStats] = useState(0);
  const [productStats, setProductStats] = useState(0);
  const [orderStats, setOrderStats] = useState(0);
  const [appointmentStats, setAppointmentStats] = useState(0);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLatestUsers(response.data.latestUsers.data);
        setLatestProducts(response.data.latestProducts.data);
        setLatestOrders(response.data.latestOrders.data);
        setLatestAppointments(response.data.latestAppointments.data);
      } catch (error) {
        setError("Error fetching dashboard data");
      }
    };

    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserStats(response.data.totalUsers);
        setProductStats(response.data.totalProducts);
        setOrderStats(response.data.totalOrders);
        setAppointmentStats(response.data.totalAppointments);
      } catch (error) {
        setError("Error fetching dashboard stats");
      }
    };

    fetchDashboardData();
    fetchDashboardStats();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  const dashboardItems = [
    { id: 1, label: "Utilisateurs", value: userStats, icon: <FaUsers /> },
    { id: 2, label: "Produits", value: productStats, icon: <FaBox /> },
    { id: 3, label: "Commandes", value: orderStats, icon: <FaShoppingCart /> },
    {
      id: 4,
      label: "Rendez-vous",
      value: appointmentStats,
      icon: <FaDollarSign />,
    },
  ];

  return (
    <div className="flex flex-row md:flex-row justify-center">
      <SideBar />
      <main className="p-4 md:p-6 space-y-6 max-md:ml-10 md:ml-20 max-sm:ml-0 w-[90%]">
        {/* Stats Section */}
        <section aria-labelledby="dashboard-stats">
          <h2 id="dashboard-stats" className="sr-only">
            Dashboard Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-4 rounded-full bg-orange-50 text-orange-500 text-xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-6 justify-center">
          {/* Orders Section */}
          <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-hidden p-4 max-lg:w-full">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Commandes récentes</h2>
              <button className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
                <Link to="/dashboard/orders">
                  Voir tout
                </Link>
              </button>
            </header>

            <div className="flex max-lg:flex-col gap-4">
              {latestOrders.map((order) => (
                <div
                  key={order._id}
                  className="min-w-[250px] bg-gray-50 rounded-lg p-3 shadow hover:shadow-md flex-shrink-0"
                >
                  <h3 className="font-bold truncate">#{order._id}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    Client: {order.customer ? order.customer.name : "Guest"}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    Produits: {order.products.map((p) => p.product?.name).join(", ")}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Users Section */}
          <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto p-4 mt-6">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Utilisateurs récents</h2>
              <button className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
                <Link to="/dashboard/users">
                  Voir tout
                </Link>
              </button>
            </header>

            <div className="flex gap-4 max-lg:flex-col">
              {latestUsers.map((user) => (
                <div
                  key={user._id}
                  className="min-w-[200px] bg-gray-50 rounded-lg p-3 shadow hover:shadow-md flex-shrink-0"
                >
                  <h3 className="font-bold truncate">{user.name}</h3>
                  <p className="text-sm text-gray-600 truncate">
                    Email: {user.email}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    Rôle: {user.role}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Products Section */}
          <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto p-4 mt-6">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Produits récents</h2>
              <button className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
                <Link to="/dashboard/AdminProducts">
                  Voir tout
                </Link>
              </button>
            </header>

            <div className="flex gap-4 max-lg:flex-col  justify-center">
              {latestProducts.map((product) => (
                <div
                  key={product._id}
                  className="min-w-[200px] flex gap-5 lg:border-r-1 bg-gray-50 p-3 
                  shadow hover:shadow-md flex-shrink-0 lgw-1/6 max-lg:w-full"
                >
                  <img src={product?.image[0].url} alt={product?.name} height={70} width={70}
                  className="border border-orange-500 rounded-lg" />
                  <div>
                    <h3 className="font-bold truncate">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Prix: ${product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Appointments Section */}
          <section className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-x-auto p-4 mt-6">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Rendez-vous récents</h2>
              <button className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600">
                <Link to="/dashboard/appointments">
                  Voir tout
                </Link>
              </button>
            </header>

            <div className="flex gap-4 max-lg:flex-col">
              {latestAppointments.map((appt) => (
                <div
                  key={appt._id}
                  className="min-w-[200px] border-gray-300 border bg-gray-50 rounded-lg p-3 shadow hover:shadow-md flex-shrink-0"
                >
                  <h3 className="font-bold truncate">
                    {appt.clientName || "Client"}
                  </h3>
                  <p className="text-sm text-gray-600">Date: {appt.date}</p>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      statusColors[appt.status]
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
