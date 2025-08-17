import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../component/sidebar";
import { useTranslation } from "react-i18next";

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/v1/reservations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservation(res.data.reservation);
      } catch (err) {
        console.error("Error fetching reservation:", err);
        setError(t("reservation.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, t]);

  if (loading) return(
          <div className="flex items-center justify-center min-h-screen ml-16 max-sm:ml-0">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
  )
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!reservation) return <p className="text-center">{t("reservation.none")}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
      <SideBar />
      <h1 className="text-2xl font-bold mb-6 text-center">
        {t("reservation.title")}
      </h1>

      {/* Dates */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("reservation.period.title")}
        </h2>
        <p>
          <strong>{t("reservation.period.checkIn")}:</strong>{" "}
          {new Date(reservation.checkInDate).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("reservation.period.checkOut")}:</strong>{" "}
          {new Date(reservation.checkOutDate).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("reservation.period.estimatedArrival")}:</strong>{" "}
          {reservation.estimatedArrival ? "Matin" : "Après-midi"}
        </p>
      </section>

      {/* Owner Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("reservation.owner.title")}
        </h2>
        <p>
          <strong>{t("reservation.owner.name")}:</strong>{" "}
          {reservation.ownerInfo?.firstName}
        </p>
        <p>
          <strong>{t("reservation.owner.phone")}:</strong>{" "}
          {reservation.ownerInfo?.phoneNumber}
        </p>
        <p>
          <strong>{t("reservation.owner.address")}:</strong>{" "}
          {reservation.ownerInfo?.address}
        </p>
      </section>

      {/* Cat Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("reservation.cat.title")}
        </h2>
        <p>
          <strong>{t("reservation.cat.breed")}:</strong>{" "}
          {reservation.catInfo?.breed}
        </p>
        <p>
          <strong>{t("reservation.cat.age")}:</strong>{" "}
          {reservation.catInfo?.age}
        </p>
        <p>
          <strong>{t("reservation.cat.number")}:</strong>{" "}
          {reservation.catInfo?.numberOfCats}
        </p>
        <p>
          <strong>{t("reservation.cat.gender")}:</strong>{" "}
          {reservation.catInfo?.gender === "male" ? "Mâle" : "Femelle"}
        </p>
        <p>
          <strong>{t("reservation.cat.sterilized")}:</strong>{" "}
          {reservation.catInfo?.sterilized ? t("common.yes") : t("common.no")}
        </p>
        <p>
          <strong>{t("reservation.cat.vaccinationNotebook")}:</strong>{" "}
          {reservation.catInfo?.vaccinationNotebook === "updated" ? "renouvelé" : "pas renouvelé"}
        </p>
        <p>
          <strong>{t("reservation.cat.antiParasiteTreatment")}:</strong>{" "}
          {reservation.catInfo?.antiParasiteTreatment
            ? t("common.yes")
            : t("common.no")}
        </p>
        <p>
          <strong>{t("reservation.cat.lastTreatmentDate")}:</strong>{" "}
          {reservation.catInfo?.lastTreatmentDate
            ? new Date(reservation.catInfo?.lastTreatmentDate).toLocaleDateString()
            : t("common.na")}
        </p>
      </section>

      {/* Health & Food */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t("reservation.health.title")}
        </h2>
        <p>
          <strong>{t("reservation.health.problems")}:</strong>{" "}
          {reservation.healthProblems || t("common.none")}
        </p>
        <p>
          <strong>{t("reservation.health.usualFood")}:</strong>{" "}
          {reservation.usualFood}
        </p>
        <p>
          <strong>{t("reservation.health.specialNotes")}:</strong>{" "}
          {reservation.specialNotes}
        </p>
      </section>

      {/* Additional Services */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          {t("reservation.services.title")}
        </h2>
        <p>
          <strong>{t("reservation.services.cleaningDecorating")}:</strong>{" "}
          {reservation.additionalServices?.cleaningDecorating
            ? t("common.yes")
            : t("common.no")}
        </p>
        <p>
          <strong>{t("reservation.services.specialMedicalCare")}:</strong>{" "}
          {reservation.additionalServices?.specialMedicalCare
            ? t("common.yes")
            : t("common.no")}
        </p>
        <p>
          <strong>{t("reservation.services.sendPicturesVideos")}:</strong>{" "}
          {reservation.additionalServices?.sendPicturesVideos
            ? t("common.yes")
            : t("common.no")}
        </p>
      </section>
    </div>
  );
};

export default ReservationDetails;
