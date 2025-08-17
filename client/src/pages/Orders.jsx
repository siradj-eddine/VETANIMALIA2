import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../component/sidebar";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation();
  const {i18n} = useTranslation();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");

  // Status styling + helper
  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-indigo-100 text-indigo-800",
    Cancelled: "bg-red-100 text-red-800",
    Refunded: "bg-emerald-100 text-emerald-800",
    _default: "bg-gray-100 text-gray-800",
  };
  const statusOptions = ["Pending", "Processing", "Shipped", "Completed", "Cancelled", "Refunded"];
  const getStatusClass = (s) => statusColors[s] || statusColors._default;
<<<<<<< HEAD


  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
=======

  const currency = t("products.currency");
>>>>>>> upstream/master

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/v1/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders || []);
        setFilteredOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(t("ordersAdmin.toasts.fetchError"));
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Date filter logic
  useEffect(() => {
    const now = new Date();
    let filtered = [...orders];

<<<<<<< HEAD
    const prev = orders;
    try {
      setOrders((cur) => cur.filter((o) => o._id !== id)); // optimistic
      await axios.delete(`http://localhost:3000/api/v1/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Order deleted successfully!");
    } catch (error) {
      setOrders(prev); // rollback
      toast.error("Failed to delete order");
    }
  };

  // Update an order's status (optimistic)
  const handleStatusChange = async (id, newStatus) => {
    const prev = orders;
    try {
      setOrders((cur) =>
        cur.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      );
=======
    switch (dateFilter) {
      case "today":
        filtered = orders.filter((order) => new Date(order.createdAt).toDateString() === now.toDateString());
        break;
      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        filtered = orders.filter((order) => new Date(order.createdAt).toDateString() === yesterday.toDateString());
        break;
      case "lastWeek":
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        filtered = orders.filter((order) => new Date(order.createdAt) >= lastWeek && new Date(order.createdAt) <= now);
        break;
      case "lastMonth":
        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        filtered = orders.filter((order) => new Date(order.createdAt) >= lastMonth && new Date(order.createdAt) <= now);
        break;
      case "lastYear":
        const lastYear = new Date(now);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        filtered = orders.filter((order) => new Date(order.createdAt) >= lastYear && new Date(order.createdAt) <= now);
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
  }, [dateFilter, orders]);

  // Delete order
  const handleDelete = async (id) => {
    if (!window.confirm(t("ordersAdmin.confirmDelete"))) return;
    const prev = orders;
    try {
      setOrders((cur) => cur.filter((o) => o._id !== id));
      setFilteredOrders((cur) => cur.filter((o) => o._id !== id));
      await axios.delete(`http://localhost:3000/api/v1/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success(t("ordersAdmin.toasts.deleted"));
    } catch (error) {
      setOrders(prev);
      setFilteredOrders(prev);
      toast.error(t("ordersAdmin.toasts.deleteError"));
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    const prev = orders;
    try {
      const updatedOrders = orders.map((o) => (o._id === id ? { ...o, status: newStatus } : o));
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
>>>>>>> upstream/master
      await axios.patch(
        `http://localhost:3000/api/v1/orders/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
<<<<<<< HEAD
      toast.success("Status updated");
    } catch (error) {
      setOrders(prev); // rollback
      toast.error("Failed to update status");
=======
      toast.success(t("ordersAdmin.toasts.statusUpdated"));
    } catch (error) {
      setOrders(prev);
      setFilteredOrders(prev);
      toast.error(t("ordersAdmin.toasts.statusError"));
>>>>>>> upstream/master
    }
  };

  if (loading) {
    return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    );
  }

  return (
    <div className={`flex w-[90%] ${i18n.language === "fr" ? "ml-[5%]" : "mr-[5%]"} bg-gray-50 min-h-screen`} style={{ fontFamily: "Kiwi Maru, serif" }}>
      <SideBar />

<<<<<<< HEAD
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-lg md:text-xl font-semibold">Orders</h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commande ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produits
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customer?.name || "Guest"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.products?.map((p) => `${p.product?.name} x ${p.quantity}`).join(", ")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Number(order?.totalAmount || 0).toFixed(2)} DZD
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-2 py-1 text-xs font-medium rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-50 rounded-lg shadow p-4">
            <p className="font-bold text-lg">Order #{order._id}</p>
            <p className="text-sm text-gray-600">
              Customer: {order.customer?.name || "Guest"}
            </p>
            <p className="text-sm text-gray-600">
              Products: {order.products?.map((p) => `${p?.product?.name} x ${p?.quantity}`).join(" , ")}
            </p>
            <p className="text-sm text-gray-600">
              Total: {Number(order?.totalAmount || 0).toFixed(2)} DZD
            </p>

            <div className="mt-3">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className={`inline-flex mt-1 px-2 py-1 text-xs font-medium rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusClass(
                  order.status
                )}`}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleDelete(order._id)}
              className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
=======
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg md:text-xl font-semibold">{t("ordersAdmin.title")}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
>>>>>>> upstream/master
            >
              <option value="all">{t("ordersAdmin.dateFilters.all")}</option>
              <option value="today">{t("ordersAdmin.dateFilters.today")}</option>
              <option value="yesterday">{t("ordersAdmin.dateFilters.yesterday")}</option>
              <option value="lastWeek">{t("ordersAdmin.dateFilters.lastWeek")}</option>
              <option value="lastMonth">{t("ordersAdmin.dateFilters.lastMonth")}</option>
              <option value="lastYear">{t("ordersAdmin.dateFilters.lastYear")}</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["id", "customer", "products", "total", "date", "status", "actions"].map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t(`ordersAdmin.table.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">#{order._id}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{order?.name || t("ordersAdmin.guest")}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {(order.products || [])
                      .map((p) => `${p?.product?.name} x ${p?.quantity}`)
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {Number(order?.totalAmount || 0).toFixed(2)} {currency}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusClass(
                        order.status
                      )}`}
                      aria-label={t("ordersAdmin.a11y.changeStatus")}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {t(`ordersAdmin.status.${s}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={t("ordersAdmin.a11y.delete")}
                      title={t("ordersAdmin.a11y.delete")}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="font-bold text-lg">
                {t("ordersAdmin.card.title")} #{order._id}
              </p>
              <p className="text-sm text-gray-600">
                {t("ordersAdmin.card.customer")}: {order.customer?.name || t("ordersAdmin.guest")}
              </p>
              <p className="text-sm text-gray-600">
                {t("ordersAdmin.card.products")}:{" "}
                {(order.products || [])
                  .map((p) => `${p?.product?.name} x ${p?.quantity}`)
                  .filter(Boolean)
                  .join(" , ")}
              </p>
              <p className="text-sm text-gray-600">
                {t("ordersAdmin.card.total")}: {Number(order?.totalAmount || 0).toFixed(2)} {currency}
              </p>
              <p className="text-sm text-gray-600">
                {t("ordersAdmin.card.date")}: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`inline-flex mt-1 px-2 py-1 text-xs font-medium rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusClass(
                    order.status
                  )}`}
                  aria-label={t("ordersAdmin.a11y.changeStatus")}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {t(`ordersAdmin.status.${s}`)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleDelete(order._id)}
                className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                aria-label={t("ordersAdmin.a11y.delete")}
                title={t("ordersAdmin.a11y.delete")}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
