import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../component/sidebar";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete an order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(orders.filter((order) => order._id !== id));
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete order" , error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ml-20 max-sm:ml-0">
      <SideBar />

      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-lg md:text-xl font-semibold">Orders</h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order._id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer?.name || "Guest"}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.products?.map((p) => `${p.product?.name} x ${p.quantity}`).join(", ")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order?.totalAmount?.toFixed(2)} DZD</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    <MdDelete size={20}/>
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
            <p className="text-sm text-gray-600">Customer: {order.customer?.name || "Guest"}</p>
            <p className="text-sm text-gray-600">Products: {order.products?.map((p) => `${p?.product?.name} x ${p?.quantity}`).join(" , ")}</p>
            <p className="text-sm text-gray-600">Total: ${order?.totalAmount?.toFixed(2)}</p>
            <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
              {order.status}
            </span>
            <button
              onClick={() => handleDelete(order._id)}
              className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
