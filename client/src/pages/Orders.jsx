import React, { useState } from "react";
import SideBar from "../component/sidebar";
export default function Orders() {
  const [orders] = useState([
    { id: 1001, customer: "John Smith", product: "Puppy Food With Chicken", quantity: 2, total: 270, status: "Completed" },
    { id: 1002, customer: "Sarah Johnson", product: "Dog Treats", quantity: 5, total: 125, status: "Pending" },
    { id: 1003, customer: "Michael Brown", product: "Dog Food With Lamb", quantity: 1, total: 48, status: "Cancelled" },
    { id: 1004, customer: "Emily White", product: "Cat Food Salmon", quantity: 3, total: 96, status: "Completed" },
    { id: 1005, customer: "David Lee", product: "Bird Seed Mix", quantity: 4, total: 72, status: "Pending" },
  ]);

  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${order.total}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-50 rounded-lg shadow p-4">
            <p className="font-bold text-lg">Order #{order.id}</p>
            <p className="text-sm text-gray-600">Customer: {order.customer}</p>
            <p className="text-sm text-gray-600">Product: {order.product}</p>
            <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-sm text-gray-600">Total: ${order.total}</p>
            <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
