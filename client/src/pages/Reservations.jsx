import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaDog, FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";
export default function Reservations() {
  const [reservations, setReservations] = useState([
    { id: 1, customer: "John Smith", pet: "Max",  date: "2023-08-12", status: "Confirmed" },
    { id: 2, customer: "Sarah Johnson", pet: "Bella", date: "2023-08-15", status: "Pending" },
    { id: 3, customer: "Michael Brown", pet: "Charlie",  date: "2023-08-20", status: "Cancelled" },
  ]);

  const handleDelete = (id) => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  return (
    <div className="p-4 md:p-6 ml-16 max-sm:ml-0">
        <SideBar />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Reservations Management</h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pet</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <FaUser className="inline mr-2 text-gray-400" /> {r.customer}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaDog className="inline mr-2 text-gray-400" /> {r.pet}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2 text-gray-400" /> {r.date}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        r.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : r.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-orange-400 hover:text-orange-600"><FaEdit /></button>
                      <button className="text-red-400 hover:text-red-600" onClick={() => handleDelete(r.id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {reservations.map((r) => (
            <div key={r.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold flex items-center mb-1">
                <FaUser className="mr-2 text-gray-400" /> {r.customer}
              </h4>
              <p className="text-sm"><FaDog className="inline mr-2 text-gray-400" /> Pet: {r.pet}</p>
              <p className="text-sm">Service: {r.service}</p>
              <p className="text-sm"><FaCalendarAlt className="inline mr-2 text-gray-400" /> {r.date}</p>
              <p className="text-sm"><FaClock className="inline mr-2 text-gray-400" /> {r.time}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                  r.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : r.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {r.status}
              </span>
              <div className="flex justify-end space-x-2 mt-3">
                <button className="text-orange-400 hover:text-orange-600"><FaEdit /></button>
                <button className="text-red-400 hover:text-red-600" onClick={() => handleDelete(r.id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
