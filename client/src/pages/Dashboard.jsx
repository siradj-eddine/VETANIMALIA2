import React, { useState, useEffect } from "react";
import { FaDollarSign, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import SideBar from "../component/sidebar";
export default function Dashboard() {
  const [, setStats] = useState({
    sales: 0,
    products: 0,
    orders: 0,
    customers: 0,
  });

  const [recentOrders] = useState([
    { id: 1001, customer: "John Smith", product: "Puppy Food With Chicken", total: 270, status: "Completed" },
    { id: 1002, customer: "Sarah Johnson", product: "Dog Treats", total: 125, status: "Pending" },
    { id: 1003, customer: "Michael Brown", product: "Dog Food With Lamb", total: 48, status: "Cancelled" },
  ]);
  const dashboardItems = [
    { id: 1, icon: <FaDollarSign />, label: "Total Sales", value: "$12,458.75" },
    { id: 2, icon: <FaBox />, label: "Products", value: "25" },
    { id: 3, icon: <FaShoppingCart />, label: "Orders", value: "320" },
    { id: 4, icon: <FaUsers />, label: "Customers", value: "150" },
  ];
  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    setStats({
      sales: 12458.75,
      products: 25,
      orders: 320,
      customers: 150,
    });
  }, []);

  return (
    <div className="flex flex-row  md:flex-row">
    <SideBar  />
    <div className="p-4 md:p-6 space-y-6 ml-20 max-sm:ml-0 ">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {dashboardItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4 border border-gray-100">
            <div className="p-3 rounded-full bg-orange-100 text-[#FFBD89] hover:text-orange-500">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className="text-xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block  overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
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
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-lg shadow p-4">
              <p className="font-bold text-lg">Order #{order.id}</p>
              <p className="text-sm text-gray-600">Customer: {order.customer}</p>
              <p className="text-sm text-gray-600">Product: {order.product}</p>
              <p className="text-sm text-gray-600">Total: ${order.total}</p>
              <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
