import React, { useState } from "react";
<<<<<<< HEAD
import catHead from "../photo/imgs/right-cat.png"

export default function HotelReservation() {
=======
import { useTranslation } from "react-i18next";
import catHead from "../photo/imgs/cathomeu.png";
import axios from "axios";
import {toast} from "sonner";

// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// MUI icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PetsIcon from "@mui/icons-material/Pets";
import NumbersIcon from "@mui/icons-material/Numbers";
import NotesIcon from "@mui/icons-material/Notes";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const InputFieldWithIcon = ({
  name,
  label,
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  type = "text",
  sx,
  multiline = false,
  rows,
}) => (
  <div className="space-y-2">
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Icon sx={{ color: "action.active", mr: 0.5, mt: 2 }} />
      <TextField
        name={name}
        label={label}
        variant="standard"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        fullWidth
        error={!!error}
        helperText={error}
        multiline={multiline}
        rows={rows}
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: error ? "error.main" : "text.secondary",
          },
          "& .MuiInputLabel-root.Mui-focused": { color: "orange" },
          "& .MuiInput-underline:after": { borderBottomColor: "orange" },
          ...sx,
        }}
        InputLabelProps={type === "date" ? { shrink: true } : undefined}
      />
    </Box>
  </div>
);

export default function HotelReservation() {
  const { t } = useTranslation();

>>>>>>> upstream/master
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    estimatedArrival: "Morning",
    ownerInfo: {
      firstName: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
    catInfo: {
      catName: "",
      breed: "Angora",
      age: "",
      numberOfCats: "",
      gender: "Male",
      sterilized: false,
      vaccinationNotebook: "Updated",
      antiParasiteTreatment: false,
      lastTreatmentDate: "",
    },
    healthProblems: "",
    usualFood: "",
    specialNotes: "",
    additionalServices: {
      cleaningDecorating: false,
      specialMedicalCare: false,
      sendPicturesVideos: false,
    },
    agreement: false,
  });

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        let nested = { ...prev[keys[0]] };
        nested[keys[1]] = type === "checkbox" ? checked : value;
        return { ...prev, [keys[0]]: nested };
      });
    } else {
=======
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name && name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        const parent = keys[0];
        const child = keys[1];
        const nested = { ...prev[parent] };
        nested[child] = type === "checkbox" ? checked : value;
        return { ...prev, [parent]: nested };
      });
    } else if (name) {
>>>>>>> upstream/master
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
<<<<<<< HEAD
  };

  // Special handler for boolean radio buttons
  const handleBooleanChange = (name, value) => {
    const keys = name.split(".");
    setFormData((prev) => {
      let nested = { ...prev[keys[0]] };
      nested[keys[1]] = value === "true";
      return { ...prev, [keys[0]]: nested };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data to send:", formData);
=======
  };

  const handleBooleanChange = (name, value) => {
    const keys = name.split(".");
    setFormData((prev) => {
      const parent = keys[0];
      const child = keys[1];
      const nested = { ...prev[parent] };
      nested[child] = value === "true";
      return { ...prev, [parent]: nested };
    });
>>>>>>> upstream/master
  };

  // Validator with i18n errors
  const validate = (data) => {
    const e = {};
    if (!data.checkInDate) e.checkInDate = t("catHotel.errors.selectCheckIn");
    if (!data.checkOutDate) e.checkOutDate = t("catHotel.errors.selectCheckOut");

    if (data.checkInDate && data.checkOutDate) {
      const inD = new Date(data.checkInDate);
      const outD = new Date(data.checkOutDate);
      if (outD <= inD) e.checkOutDate = t("catHotel.errors.checkoutAfterCheckin");
    }

    if (!data.ownerInfo.firstName.trim()) e.firstName = t("catHotel.errors.firstNameRequired");
    if (!data.ownerInfo.phoneNumber.trim()) e.phoneNumber = t("catHotel.errors.phoneRequired");

    if (!data.catInfo.catName.trim()) e.catName = t("catHotel.errors.catNameRequired");
    if (!data.catInfo.numberOfCats || Number(data.catInfo.numberOfCats) < 1)
      e.numberOfCats = t("catHotel.errors.numberOfCats");

    if (data.catInfo.antiParasiteTreatment && !data.catInfo.lastTreatmentDate) {
      e.lastTreatmentDate = t("catHotel.errors.provideLastTreatment");
    }

    if (!data.agreement) e.agreement = t("catHotel.errors.mustAcceptTerms");

    return e;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const eMap = validate(formData);
  setErrors(eMap);
  if (Object.keys(eMap).length > 0) return;

  // ✅ Prepare data for backend
  const payload = {
    checkInDate: formData.checkInDate ? new Date(formData.checkInDate).toISOString() : null,
    checkOutDate: formData.checkOutDate ? new Date(formData.checkOutDate).toISOString() : null,
    estimatedArrival: formData.estimatedArrival,

    ownerInfo: {
      firstName: formData.ownerInfo.firstName,
      phoneNumber: formData.ownerInfo.phoneNumber,
      address: formData.ownerInfo.address,
      // ❌ exclude email since backend doesn't need it
    },

    catInfo: {
      catName: formData.catInfo.catName,
      breed: formData.catInfo.breed,
      age: formData.catInfo.age ? Number(formData.catInfo.age) : null,
      numberOfCats: formData.catInfo.numberOfCats ? Number(formData.catInfo.numberOfCats) : null,
      gender: formData.catInfo.gender,
      sterilized: formData.catInfo.sterilized,
      vaccinationNotebook: formData.catInfo.vaccinationNotebook,
      antiParasiteTreatment: formData.catInfo.antiParasiteTreatment,
      lastTreatmentDate: formData.catInfo.lastTreatmentDate
        ? new Date(formData.catInfo.lastTreatmentDate).toISOString()
        : null,
    },

    healthProblems: formData.healthProblems,
    usualFood: formData.usualFood,
    specialNotes: formData.specialNotes,

    additionalServices: {
      cleaningDecorating: formData.additionalServices.cleaningDecorating,
      specialMedicalCare: formData.additionalServices.specialMedicalCare,
      sendPicturesVideos: formData.additionalServices.sendPicturesVideos,
    },
  };

  try {
    const res = await axios.post("http://localhost:3000/api/v1/reservations", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

     setFormData({
      checkInDate: "",
      checkOutDate: "",
      estimatedArrival: "Morning",
      ownerInfo: {
        firstName: "",
        phoneNumber: "",
        address: "",
        email: "",
      },
      catInfo: {
        catName: "",
        breed: "Angora",
        age: "",
        numberOfCats: "",
        gender: "Male",
        sterilized: false,
        vaccinationNotebook: "Updated",
        antiParasiteTreatment: false,
        lastTreatmentDate: "",
      },
      healthProblems: "",
      usualFood: "",
      specialNotes: "",
      additionalServices: {
        cleaningDecorating: false,
        specialMedicalCare: false,
        sendPicturesVideos: false,
      },
    });

    toast("✅ Reservation submitted successfully!");
  } catch (error) {
    console.error("Error submitting reservation:", error);
    toast("❌ Something went wrong while submitting.");
  }
};

  return (
<<<<<<< HEAD
    <main className="max-w-[95%] mx-auto px-4 md:px-7.5 w-full box-content bg-white rounded-lg shadow-xl font-serif">
      <header className="py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-start md:ml-32">
          Hotel Reservation
        </h1>
      </header>

      <section className="flex flex-col items-center mb-8">
        <div className="flex flex-row items-center justify-center gap-4 max-md:w-2/3 max-sm:w-full max-sm:text-sm max-md:text-sm md:gap-8 border-2 border-orange-300 rounded-full px-4 py-3 w-full max-w-2xl">
          <div className="flex flex-col items-start w-full md:w-auto">
            <span className="text-sm">Check-in Date</span>
=======
    <main
      className="max-w-[95%] mx-auto px-4 md:px-7.5 w-full box-content bg-white rounded-lg shadow-xl font-serif"
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      <header className="py-6 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-start md:ml-32">
          {t("catHotel.hotelReservation.title")}
        </h1>
        <img src={catHead} className="absolute w-40 left-40 top-19 max-xl:hidden" alt="" />
      </header>

      <section className="flex flex-col items-center mb-8">
        {/* Dates row */}
        <div className="flex flex-row items-center justify-center gap-4 max-md:w-2/3 max-sm:w-full max-sm:text-sm max-md:text-sm md:gap-8 border-2 border-orange-300 rounded-full px-4 py-3 w-full max-w-2xl">
          <div className="flex flex-col items-start w-full md:w-auto">
            <span className="text-sm">{t("catHotel.form.checkInDate")}</span>
>>>>>>> upstream/master
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
<<<<<<< HEAD
              required
              className="outline-none text-gray-600 w-full min-w-[150px]"
            />
          </div>
          <div className="h-8 w-px bg-gray-300 hidden md:block" />
          <div className="flex flex-col items-start w-full md:w-auto">
            <span className="text-sm">Check-out Date</span>
=======
              className={`outline-none text-gray-600 w-full min-w-[150px] ${
                errors.checkInDate ? "border-b-2 border-red-500" : ""
              }`}
            />
            {errors.checkInDate && (
              <p className="text-sm text-red-600 mt-1">{errors.checkInDate}</p>
            )}
          </div>

          <div className="h-8 w-px bg-gray-300 hidden md:block" />

          <div className="flex flex-col items-start w-full md:w-auto">
            <span className="text-sm">{t("catHotel.form.checkOutDate")}</span>
>>>>>>> upstream/master
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
<<<<<<< HEAD
              required
              className="outline-none text-gray-600 w-full min-w-[150px]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="text-sm">Estimated time of arrival:</span>
=======
              className={`outline-none text-gray-600 w-full min-w-[150px] ${
                errors.checkOutDate ? "border-b-2 border-red-500" : ""
              }`}
            />
            {errors.checkOutDate && (
              <p className="text-sm text-red-600 mt-1">{errors.checkOutDate}</p>
            )}
          </div>
        </div>

        {/* Estimated arrival */}
        <div className="mt-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="text-sm">{t("catHotel.form.estimatedArrival")}</span>
>>>>>>> upstream/master
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="estimatedArrival"
                value="Morning"
                checked={formData.estimatedArrival === "Morning"}
                onChange={handleChange}
              />
<<<<<<< HEAD
              <span>Morning</span>
=======
              <span>{t("catHotel.form.morning")}</span>
>>>>>>> upstream/master
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="estimatedArrival"
                value="Evening"
                checked={formData.estimatedArrival === "Evening"}
                onChange={handleChange}
              />
<<<<<<< HEAD
              <span>Evening</span>
=======
              <span>{t("catHotel.form.evening")}</span>
>>>>>>> upstream/master
            </label>
          </div>
        </div>
      </section>
<<<<<<< HEAD
      <hr className="my-8 border-1" />

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6 w-full md:w-5/6 mx-auto flex flex-col">
          {/* Owner Information */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              1. Owner Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  name="ownerInfo.firstName"
                  placeholder="First Name"
                  value={formData.ownerInfo.firstName}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none"
                />
              </label>
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  name="ownerInfo.phoneNumber"
                  placeholder="Phone Number"
                  value={formData.ownerInfo.phoneNumber}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none"
                />
              </label>
            </div>
            <div className="mt-4 w-full md:w-1/2 md:ml-24">
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  name="ownerInfo.address"
                  placeholder="Address"
                  value={formData.ownerInfo.address}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none"
                />
              </label>
            </div>
          </section>

          {/* Additional Services */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              3. Additional Services (Optional)
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.cleaningDecorating"
                  checked={formData.additionalServices.cleaningDecorating}
                  onChange={handleChange}
                />
                <span>Cleaning / Decorating during the stay</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.specialMedicalCare"
                  checked={formData.additionalServices.specialMedicalCare}
                  onChange={handleChange}
                />
                <span>Special medical care</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.sendPicturesVideos"
                  checked={formData.additionalServices.sendPicturesVideos}
                  onChange={handleChange}
                />
                <span>Send pictures/videos during the stay</span>
              </label>
            </div>
          </section>

          {/* Required Documents */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              Required Documents
            </h2>
            <div className="space-y-3">
              <p>-- Vaccination record updated</p>
              <p>-- Copy of owner's ID card</p>
            </div>
          </section>

          {/* Agreement */}
          <label className="flex items-start gap-2 p-4 bg-white rounded-lg shadow border border-gray-200">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="mt-1"
            />
            <span className="text-sm md:text-base">
              By agreeing, I acknowledge that I have read the general terms of
              the Cat Hotel, and I confirm that my cat is healthy, vaccinated,
              and I will provide food and proper litter for the entire duration
              of the stay.
            </span>
          </label>
        </div>

        {/* Right Column */}
        <div className="space-y-6 w-full relative">
        <section className="bg-white relative shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
        <img src={catHead} className="absolute w-16 right-146.5 max-xl:hidden" alt="" />
            <h2 className="text-lg font-bold text-center mb-4">
              2. Cat Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  name="catInfo.catName"
                  placeholder="Cat Name"
                  value={formData.catInfo.catName}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                />
              </label>
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <select
                  name="catInfo.breed"
                  value={formData.catInfo.breed}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none bg-transparent"
                >
                  <option>Angora</option>
                  <option>Persian</option>
                  <option>Siamese</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-center">
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  type="number"
                  name="catInfo.age"
                  placeholder="Age of Cats"
                  value={formData.catInfo.age}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none"
                />
              </label>
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <input
                  type="number"
                  name="catInfo.numberOfCats"
                  placeholder="Number of Cats"
                  value={formData.catInfo.numberOfCats}
                  onChange={handleChange}
                  required
                  className="flex-1 outline-none"
                />
              </label>
            </div>

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center mb-2 md:ml-31">Gender :</span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.gender"
                    value="Male"
                    checked={formData.catInfo.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.gender"
                    value="Female"
                    checked={formData.catInfo.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

              <div className="flex flex-col md:flex-row items-center justify-around">
            <span className="text-lg text-center mb-2">Sterilized / Castrated :</span>
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sterilized"
                  checked={formData.catInfo.sterilized === true}
                  onChange={() => handleBooleanChange("catInfo.sterilized", "true")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sterilized"
                  checked={formData.catInfo.sterilized === false}
                  onChange={() => handleBooleanChange("catInfo.sterilized", "false")}
                />
                <span>No</span>
              </label>
            </div>
          </div>
            
            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center ml-12 mb-2">Vaccination notebook :</span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.vaccinationNotebook"
                    value="Updated"
                    checked={formData.catInfo.vaccinationNotebook === "Updated"}
                    onChange={handleChange}
                  />
                  <span>Updated</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.vaccinationNotebook"
                    value="Not updated"
                    checked={formData.catInfo.vaccinationNotebook === "Not updated"}
                    onChange={handleChange}
                  />
                  <span>Not updated</span>
                </label>
              </div>
            </div>
       <div className="flex flex-col md:flex-row items-center justify-around">
            <span className="text-lg text-center mb-2">Anti-parasite treatment :</span>
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="antiParasiteTreatment"
                  checked={formData.catInfo.antiParasiteTreatment === true}
                  onChange={() => handleBooleanChange("catInfo.antiParasiteTreatment", "true")}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="antiParasiteTreatment"
                  checked={formData.catInfo.antiParasiteTreatment === false}
                  onChange={() => handleBooleanChange("catInfo.antiParasiteTreatment", "false")}
                />
                <span>No</span>
=======

      <hr className="my-8 border-1" />

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6 w-full md:w-5/6 mx-auto flex flex-col">
          {/* Owner Information */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              {`1. ${t("catHotel.form.ownerInfo")}`}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <InputFieldWithIcon
                name="ownerInfo.firstName"
                label={t("catHotel.form.firstName")}
                icon={AccountCircle}
                placeholder={t("catHotel.form.firstName")}
                value={formData.ownerInfo.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />

              <InputFieldWithIcon
                name="ownerInfo.phoneNumber"
                label={t("catHotel.form.phoneNumber")}
                icon={PhoneIcon}
                placeholder={t("catHotel.form.phoneNumber")}
                value={formData.ownerInfo.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />
            </div>

            <div className="mt-4 w-8/10 mx-[3%]">
              <InputFieldWithIcon
                name="ownerInfo.address"
                label={t("catHotel.form.address")}
                icon={LocationOnIcon}
                placeholder={t("catHotel.form.address")}
                value={formData.ownerInfo.address}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* Additional Services */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              {`3. ${t("catHotel.form.additionalServices")}`}
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.cleaningDecorating"
                  checked={formData.additionalServices.cleaningDecorating}
                  onChange={handleChange}
                />
                <span>{t("catHotel.form.cleaningDecorating")}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.specialMedicalCare"
                  checked={formData.additionalServices.specialMedicalCare}
                  onChange={handleChange}
                />
                <span>{t("catHotel.form.specialMedicalCare")}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="additionalServices.sendPicturesVideos"
                  checked={formData.additionalServices.sendPicturesVideos}
                  onChange={handleChange}
                />
                <span>{t("catHotel.form.sendPicturesVideos")}</span>
>>>>>>> upstream/master
              </label>
            </div>
          </section>

<<<<<<< HEAD
       {formData.catInfo.antiParasiteTreatment && (
  <div className="flex flex-col md:flex-row items-center ml-20 gap-2">
    <label>Date Of Last Treatment : </label>
    <input
      type="date"
      name="catInfo.lastTreatmentDate"
      value={formData.catInfo.lastTreatmentDate}
      onChange={handleChange}
      className="outline-none text-gray-600"
    />
  </div>
)}

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            <div className="flex flex-col md:flex-row w-full h-full items-center justify-around gap-4">
              {/* Health Problems */}
              <div className="flex flex-col items-center w-full md:w-1/2 justify-center md:border-r-2 md:pr-4 lg:pr-14">
                <div className="w-full">
                  <p className="text-xl text-center mb-2">Health problems</p>
                  <textarea
                    name="healthProblems"
                    placeholder="Write problems here"
                    value={formData.healthProblems}
                    onChange={handleChange}
                    required
                    className="mt-4 w-full border border-orange-300 rounded-xl p-3 text-sm outline-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Usual Food */}
              <div className="flex flex-col items-center w-full md:w-1/2 justify-center">
                <div className="w-full">
                  <p className="text-xl text-center mb-2">The usual food</p>
                  <textarea
                    name="usualFood"
                    placeholder="The usual food"
                    value={formData.usualFood}
                    onChange={handleChange}
                    required
                    className="mt-4 w-full border border-orange-300 rounded-xl p-3 text-sm outline-none"
                    rows={3}
                  />
                </div>
              </div>
=======
          {/* Required Documents */}
          <section className="bg-white shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              {t("catHotel.form.requiredDocuments")}
            </h2>
            <div className="space-y-3">
              <p>— {t("catHotel.form.vaccinationRecord")}</p>
              <p>— {t("catHotel.form.idCardCopy")}</p>
>>>>>>> upstream/master
            </div>
          </section>

<<<<<<< HEAD
=======
          {/* Agreement */}
          <label className="flex items-start gap-2 p-4 bg-white rounded-lg shadow border border-gray-200">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className={`mt-1 ${errors.agreement ? "ring-2 ring-red-500 rounded" : ""}`}
            />
            <span className="text-sm md:text-base">
              {t("catHotel.form.agreement")}
            </span>
          </label>
          {errors.agreement && (
            <p className="text-sm text-red-600 ml-2 -mt-3">{errors.agreement}</p>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6 w-full relative">
          <section className="bg-white relative shadow-xl border-2 border-amber-600/70 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg font-bold text-center mb-4">
              {`2. ${t("catHotel.form.catInfo")}`}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <InputFieldWithIcon
                name="catInfo.catName"
                label={t("catHotel.form.catName")}
                icon={PetsIcon}
                placeholder={t("catHotel.form.catName")}
                value={formData.catInfo.catName}
                onChange={handleChange}
                error={errors.catName}
              />

              {/* Native select */}
              <label className="flex items-center gap-2 border-b border-gray-300 py-1 w-full">
                <select
                  name="catInfo.breed"
                  value={formData.catInfo.breed}
                  onChange={handleChange}
                  className="flex-1 outline-none bg-transparent"
                >
                  <option value="Angora">{t("catHotel.form.breeds.angora")}</option>
                  <option value="Persian">{t("catHotel.form.breeds.persian")}</option>
                  <option value="Siamese">{t("catHotel.form.breeds.siamese")}</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-center">
              <InputFieldWithIcon
                name="catInfo.age"
                type="number"
                label={t("catHotel.form.age")}
                icon={NumbersIcon}
                placeholder={t("catHotel.form.age")}
                value={formData.catInfo.age}
                onChange={handleChange}
              />

              <InputFieldWithIcon
                name="catInfo.numberOfCats"
                type="number"
                label={t("catHotel.form.numberOfCats")}
                icon={NumbersIcon}
                placeholder={t("catHotel.form.numberOfCats")}
                value={formData.catInfo.numberOfCats}
                onChange={handleChange}
                error={errors.numberOfCats}
              />
            </div>

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            {/* Gender */}
            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center mb-2 md:ml-31">
                {t("catHotel.form.gender")} :
              </span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.gender"
                    value="Male"
                    checked={formData.catInfo.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span>{t("catHotel.form.male")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.gender"
                    value="Female"
                    checked={formData.catInfo.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>{t("catHotel.form.female")}</span>
                </label>
              </div>
            </div>

            {/* Sterilized */}
            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center mb-2">
                {t("catHotel.form.sterilized")} :
              </span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.sterilized"
                    value="true"
                    checked={formData.catInfo.sterilized === true}
                    onChange={(e) =>
                      handleBooleanChange("catInfo.sterilized", e.target.value)
                    }
                  />
                  <span>{t("catHotel.form.yes")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.sterilized"
                    value="false"
                    checked={formData.catInfo.sterilized === false}
                    onChange={(e) =>
                      handleBooleanChange("catInfo.sterilized", e.target.value)
                    }
                  />
                  <span>{t("catHotel.form.no")}</span>
                </label>
              </div>
            </div>

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            {/* Vaccination */}
            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center ml-12 mb-2">
                {t("catHotel.form.vaccinationNotebook")} :
              </span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.vaccinationNotebook"
                    value="Updated"
                    checked={formData.catInfo.vaccinationNotebook === "Updated"}
                    onChange={handleChange}
                  />
                  <span>{t("catHotel.form.updated")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.vaccinationNotebook"
                    value="Not updated"
                    checked={formData.catInfo.vaccinationNotebook === "Not updated"}
                    onChange={handleChange}
                  />
                  <span>{t("catHotel.form.notUpdated")}</span>
                </label>
              </div>
            </div>

            {/* Anti-parasite */}
            <div className="flex flex-col md:flex-row items-center justify-around">
              <span className="text-lg text-center mb-2">
                {t("catHotel.form.antiParasiteTreatment")} :
              </span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.antiParasiteTreatment"
                    value="true"
                    checked={formData.catInfo.antiParasiteTreatment === true}
                    onChange={(e) =>
                      handleBooleanChange(
                        "catInfo.antiParasiteTreatment",
                        e.target.value
                      )
                    }
                  />
                  <span>{t("catHotel.form.yes")}</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catInfo.antiParasiteTreatment"
                    value="false"
                    checked={formData.catInfo.antiParasiteTreatment === false}
                    onChange={(e) =>
                      handleBooleanChange(
                        "catInfo.antiParasiteTreatment",
                        e.target.value
                      )
                    }
                  />
                  <span>{t("catHotel.form.no")}</span>
                </label>
              </div>
            </div>

            {/* Last treatment date */}
            {formData.catInfo.antiParasiteTreatment && (
              <div className="flex flex-col md:flex-row flex-center items-center md:ml-20 gap-2">
                <label className="md:whitespace-nowrap">
                  {t("catHotel.form.lastTreatmentDate")}:
                </label>
                <InputFieldWithIcon
                  name="catInfo.lastTreatmentDate"
                  type="date"
                  label=""
                  icon={CalendarMonthIcon}
                  value={formData.catInfo.lastTreatmentDate}
                  onChange={handleChange}
                  error={errors.lastTreatmentDate}
                />
              </div>
            )}

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            {/* Textareas */}
            <div className="flex flex-col md:flex-row w-full h-full items-center  justify-center ">
              <div className="flex flex-col items-center w-full md:w-1/2 justify-center md:border-x-1  md:px-4 lg:px-7">
                <div className="w-full">
                  <p className="text-xl text-center mb-2">
                    {t("catHotel.form.healthProblems")}
                  </p>
                  <InputFieldWithIcon
                    name="healthProblems"
                    label=""
                    icon={NotesIcon}
                    placeholder={t("catHotel.form.placeholders.writeProblems")}
                    value={formData.healthProblems}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center w-full md:w-1/2 justify-center md:border-x-1 md:px-4 lg:px-7">
                <div className="w-full">
                  <p className="text-xl text-center mb-2">
                    {t("catHotel.form.usualFood")}
                  </p>
                  <InputFieldWithIcon
                    name="usualFood"
                    label=""
                    icon={RestaurantIcon}
                    placeholder={t("catHotel.form.placeholders.usualFood")}
                    value={formData.usualFood}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </div>
              </div>
            </div>

>>>>>>> upstream/master
            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            {/* Special Notes */}
            <div>
<<<<<<< HEAD
              <p className="text-center">Special notes or behavior</p>
              <textarea
                name="specialNotes"
                placeholder="Write (shy, aggressive, playful...)"
                value={formData.specialNotes}
                onChange={handleChange}
                className="mt-4 w-full border border-orange-300 rounded-xl p-3 text-sm outline-none"
=======
              <p className="text-center">{t("catHotel.form.specialNotes")}</p>
              <InputFieldWithIcon
                name="specialNotes"
                label=""
                icon={NotesIcon}
                placeholder={t("catHotel.form.placeholders.specialNotes")}
                value={formData.specialNotes}
                onChange={handleChange}
                multiline
>>>>>>> upstream/master
                rows={3}
              />
            </div>
          </section>
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 mt-4 rounded-full w-full sm:w-1/2 transition"
          >
<<<<<<< HEAD
            Reserve NOW
=======
            {t("catHotel.buttons.reserveNow")}
>>>>>>> upstream/master
          </button>
        </div>
      </form>
    </main>
  );
}