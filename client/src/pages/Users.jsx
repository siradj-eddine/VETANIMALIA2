import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import SideBar from "../component/sidebar";
import axios from "axios";
import { toast } from "sonner";

export default function Users() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customers from backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCustomers(response.data.users); // assuming your backend returns { users: [...] }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete customer
  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCustomers(customers.filter((c) => c._id !== id));
      toast.success("Client supprimé avec succès !");
    } catch (error) {
      toast.error("Échec de la suppression du client : " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading customers...</p>
      </div>
    );
  }


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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Membre Depuis</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${c.name.replace(" ", "+")}&background=random`}
                        alt={c.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-sm text-gray-500">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaPhone className="inline mr-2 text-gray-400" />
                    {c.phone ? 0+c.phone : "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2 text-gray-400" />
                    {c.createdAt?.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-red-400 hover:text-red-600" onClick={() => handleDeleteCustomer(c._id)}><FaTrash /></button>
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
            <div key={c._id} className="border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm">
              <div className="flex items-center mb-3">
                <img
                  className="h-12 w-12 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${c.name.replace(" ", "+")}&background=random`}
                  alt={c.name}
                />
                <div className="ml-3">
                  <h4 className="font-semibold">{c.name}</h4>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
              </div>
              <p className="text-sm"><FaPhone className="inline mr-2 text-gray-400" /> {c.phone ? 0+c.phone : "N/A"}</p>
              <p className="text-sm"><FaCalendarAlt className="inline mr-2 text-gray-400" /> {c.createdAt?.split("T")[0]}</p>

                <div className="flex space-x-2">
                  <button className="text-red-400 hover:text-red-600" onClick={() => handleDeleteCustomer(c._id)}><FaTrash /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
