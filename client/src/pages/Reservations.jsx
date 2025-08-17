import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaDog,
  FaEdit,
  FaTrash,
  FaHome,
  FaPhone,
  FaNotesMedical,
} from "react-icons/fa";
import {LuBookUser} from "react-icons/lu";
import SideBar from "../component/sidebar";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Reservations() {
  const { t } = useTranslation();
  const {i18n} = useTranslation();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        // backend sends { reservations: [...] } or single { reservation }
        const normalized = Array.isArray(data.reservations)
          ? data.reservations
          : data.reservation
          ? [data.reservation]
          : [];

        setReservations(normalized);
      } catch (err) {
        console.error("Failed to fetch reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete reservation:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-4 ml-16">
      <div className="flex items-center justify-center min-h-screen ml-16 max-sm:ml-0">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-6 ${i18n.language === "fr" ? "ml-16" : "mr-16"} max-sm:ml-0`} style={{ fontFamily: "Kiwi Maru, serif" }}>
      <SideBar />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">{t("reservationsAdmin.title")}</h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("reservationsAdmin.table.customer")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("reservationsAdmin.table.pet")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("reservationsAdmin.table.date")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {t("reservationsAdmin.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <FaUser className="inline mr-2 text-gray-400" /> {r.ownerInfo?.firstName} <br />
                    <FaPhone className="inline mr-2 text-gray-400" /> {r.ownerInfo?.phoneNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaDog className="inline mr-2 text-gray-400" /> {r.catInfo?.catName} ({r.catInfo?.breed})<br />
                    {r.catInfo?.age} yrs, {r.catInfo?.gender}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2 text-gray-400" />
                    {new Date(r.checkInDate).toLocaleDateString()} →{" "}
                    {new Date(r.checkOutDate).toLocaleDateString()} <br />
                    <FaClock className="inline mr-2 text-gray-400" /> {r.estimatedArrival}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link to={`/dashboard/reservations/${r._id}`}
                        className="text-orange-400 hover:text-orange-600"
                      >
                        <LuBookUser size={22}/>
                      </Link>
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => handleDelete(r._id)}
                        aria-label={t("reservationsAdmin.a11y.delete", { name: r.ownerInfo?.firstName })}
                        title={t("reservationsAdmin.a11y.delete", { name: r.ownerInfo?.firstName })}
                      >
                        <FaTrash />
                      </button>
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
            <div key={r._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold flex items-center mb-1">
                <FaUser className="mr-2 text-gray-400" /> {r.ownerInfo?.firstName}
              </h4>
              <p className="text-sm">
                <FaPhone className="inline mr-2 text-gray-400" /> {r.ownerInfo?.phoneNumber}
              </p>
              <p className="text-sm">
                <FaDog className="inline mr-2 text-gray-400" /> {r.catInfo?.catName} ({r.catInfo?.breed})
              </p>
              <p className="text-sm">
                <FaCalendarAlt className="inline mr-2 text-gray-400" />{" "}
                {new Date(r.checkInDate).toLocaleDateString()} → {new Date(r.checkOutDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <FaClock className="inline mr-2 text-gray-400" /> {r.estimatedArrival}
              </p>
              <p className="text-sm">
                <FaNotesMedical className="inline mr-2 text-gray-400" /> {r.healthProblems || "No issues"}
              </p>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="text-orange-400 hover:text-orange-600"
                  aria-label={t("reservationsAdmin.a11y.edit", { name: r.ownerInfo?.firstName })}
                  title={t("reservationsAdmin.a11y.edit", { name: r.ownerInfo?.firstName })}
                >
                  <LuBookUser />
                </button>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => handleDelete(r._id)}
                  aria-label={t("reservationsAdmin.a11y.delete", { name: r.ownerInfo?.firstName })}
                  title={t("reservationsAdmin.a11y.delete", { name: r.ownerInfo?.firstName })}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
