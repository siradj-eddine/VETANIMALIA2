import React, { useState, useEffect } from "react";
import SideBar from "../component/sidebar";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading appointments...</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/appointments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== id));
      toast.success("Rendez-vous supprimé avec succès");
    } catch (error) {
      console.error("Rendez-vous Pas Supprimé:", error);
    }
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">symptoms</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments?.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{appt._id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt?.user?.name || "Guest"}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.date?.split("T")[0]}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{appt.symptoms}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[appt.status]}`}>
                      <button onClick={() => handleDelete(appt._id)}>
                        <MdDelete color="red" size={25}/>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {appointments?.map((appt) => (
            <div key={appt._id} className="bg-gray-50 rounded-lg shadow p-4">
              <p className="font-bold text-lg">Appointment #{appt._id}</p>
              <p className="text-sm text-gray-600">Customer: {appt.customer?.name || "Guest"}</p>
              <p className="text-sm text-gray-600">Date: {appt.date?.split("T")[0]}</p>
              <p className="text-sm text-gray-600">Service: {appt.symptoms}</p>
              <span className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[appt.status]}`}>
                <button onClick={() => handleDelete(appt._id)}>
                  <MdDelete color="red" size={25}/>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
