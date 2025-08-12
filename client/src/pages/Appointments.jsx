import React, { useState } from "react";
import SideBar from "../component/sidebar"
export default function Appointments() {
  const [appointments] = useState([
    { id: 1, customer: "John Smith", date: "2025-08-12", service: "Vet Checkup", status: "Confirmed" },
    { id: 2, customer: "Sarah Johnson", date: "2025-08-13", service: "Grooming", status: "Pending" },
    { id: 3, customer: "Michael Brown", date: "2025-08-14", service: "Vaccination", status: "Cancelled" },
  ]);

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 md:p-6 space-y-6 ml-20 max-sm:ml-0">
      <SideBar/>
      {/* Page Title */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold">Appointments</h3>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{appt.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.customer}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.service}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[appt.status]}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-gray-50 rounded-lg shadow p-4">
              <p className="font-bold text-lg">Appointment #{appt.id}</p>
              <p className="text-sm text-gray-600">Customer: {appt.customer}</p>
              <p className="text-sm text-gray-600">Date: {appt.date}</p>
              <p className="text-sm text-gray-600">Time: {appt.time}</p>
              <p className="text-sm text-gray-600">Service: {appt.service}</p>
              <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[appt.status]}`}>
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
