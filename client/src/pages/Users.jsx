import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";

export default function Users() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", phone: "+1 555-123-4567", address: "123 Main St, New York", orders: 5, joinDate: "2022-01-15" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 555-987-6543", address: "456 Oak Ave, Los Angeles", orders: 12, joinDate: "2021-11-03" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "+1 555-456-7890", address: "789 Pine Rd, Chicago", orders: 8, joinDate: "2022-03-22" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "+1 555-789-1234", address: "321 Elm Blvd, Houston", orders: 3, joinDate: "2023-01-10" },
  ]);

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4 md:p-6 ml-16 max-sm:ml-0">
      <SideBar/>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Customers Management</h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Since</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${c.name.replace(" ", "+")}&background=random`} alt={c.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-sm text-gray-500">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaPhone className="inline mr-2 text-gray-400" />
                    {c.phone}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaMapMarkerAlt className="inline mr-2 text-gray-400" />
                    {c.address}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">{c.orders}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2 text-gray-400" />
                    {c.joinDate}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-orange-400 hover:text-orange-600"><FaEdit /></button>
                      <button className="text-red-400 hover:text-red-600" onClick={() => handleDeleteCustomer(c.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {customers.map((c) => (
            <div key={c.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <img className="h-12 w-12 rounded-full" src={`https://ui-avatars.com/api/?name=${c.name.replace(" ", "+")}&background=random`} alt={c.name} />
                <div className="ml-3">
                  <h4 className="font-semibold">{c.name}</h4>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
              </div>
              <p className="text-sm"><FaPhone className="inline mr-2 text-gray-400" /> {c.phone}</p>
              <p className="text-sm"><FaMapMarkerAlt className="inline mr-2 text-gray-400" /> {c.address}</p>
              <p className="text-sm"><FaCalendarAlt className="inline mr-2 text-gray-400" /> Member since {c.joinDate}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">{c.orders} orders</span>
                <div className="flex space-x-2">
                  <button className="text-orange-400 hover:text-orange-600"><FaEdit /></button>
                  <button className="text-red-400 hover:text-red-600" onClick={() => handleDeleteCustomer(c.id)}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
