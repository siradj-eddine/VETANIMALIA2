import React, { useState } from "react";
import catHead from "../photo/imgs/right-cat.png"

export default function HotelReservation() {
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
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
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
  };

  return (
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
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              className="outline-none text-gray-600 w-full min-w-[150px]"
            />
          </div>
          <div className="h-8 w-px bg-gray-300 hidden md:block" />
          <div className="flex flex-col items-start w-full md:w-auto">
            <span className="text-sm">Check-out Date</span>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              className="outline-none text-gray-600 w-full min-w-[150px]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="text-sm">Estimated time of arrival:</span>
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="estimatedArrival"
                value="Morning"
                checked={formData.estimatedArrival === "Morning"}
                onChange={handleChange}
              />
              <span>Morning</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="estimatedArrival"
                value="Evening"
                checked={formData.estimatedArrival === "Evening"}
                onChange={handleChange}
              />
              <span>Evening</span>
            </label>
          </div>
        </div>
      </section>
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
              </label>
            </div>
          </div>

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
            </div>

            <hr className="my-4 w-2/3 mx-auto md:ml-24" />

            {/* Special Notes */}
            <div>
              <p className="text-center">Special notes or behavior</p>
              <textarea
                name="specialNotes"
                placeholder="Write (shy, aggressive, playful...)"
                value={formData.specialNotes}
                onChange={handleChange}
                className="mt-4 w-full border border-orange-300 rounded-xl p-3 text-sm outline-none"
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
            Reserve NOW
          </button>
        </div>
      </form>
    </main>
  );
}