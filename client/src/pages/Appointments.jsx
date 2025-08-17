import React, { useState, useEffect } from "react";
import SideBar from "../component/sidebar";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Appointments() {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend status values -> badge colors
  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };


  useEffect(() => {
    const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/api/v1/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(t("appointmentsAdmin.toasts.fetchError"));
    } finally {
      setLoading(false);
    }
  };
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">{t("appointmentsAdmin.loading")}</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      if (!window.confirm(t("appointmentsAdmin.confirmDelete"))) return;
      await axios.delete(`http://localhost:3000/api/v1/appointments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      toast.success(t("appointmentsAdmin.toasts.deleted"));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(t("appointmentsAdmin.toasts.deleteError"));
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 ml-20 max-sm:ml-0" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <SideBar />

      {/* Page Title */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold">{t("appointmentsAdmin.title")}</h3>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("appointmentsAdmin.table.id")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("appointmentsAdmin.table.client")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("appointmentsAdmin.table.date")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("appointmentsAdmin.table.symptoms")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("appointmentsAdmin.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments?.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{appt._id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt?.user?.name || t("appointmentsAdmin.guest")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt.date?.split("T")[0]}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appt.symptoms}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap flex items-center gap-2">
                    
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="p-1 rounded-md hover:bg-red-50"
                      aria-label={t("appointmentsAdmin.a11y.delete", { id: appt._id })}
                      title={t("appointmentsAdmin.a11y.delete", { id: appt._id })}
                    >
                      <MdDelete color="red" size={22} />
                    </button>
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
              <p className="font-bold text-lg">
                {t("appointmentsAdmin.card.title")} #{appt._id}
              </p>
              <p className="text-sm text-gray-600">
                {t("appointmentsAdmin.card.customer")}: {appt?.user?.name || t("appointmentsAdmin.guest")}
              </p>
              <p className="text-sm text-gray-600">
                {t("appointmentsAdmin.card.date")}: {appt.date?.split("T")[0]}
              </p>
              <p className="text-sm text-gray-600">
                {t("appointmentsAdmin.card.symptoms")}: {appt.symptoms}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColors[appt.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {t(`appointmentsAdmin.status.${appt.status}`)}
                </span>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="ml-auto p-1 rounded-md hover:bg-red-50"
                  aria-label={t("appointmentsAdmin.a11y.delete", { id: appt._id })}
                  title={t("appointmentsAdmin.a11y.delete", { id: appt._id })}
                >
                  <MdDelete color="red" size={25} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
