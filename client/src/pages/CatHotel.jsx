import React, { useState } from "react";

export default function HotelReservation() {
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    estimatedArrival: "Morning",
    ownerInfo: {
      firstName: "",
      phoneNumber: "",
      address: ""
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
      lastTreatmentDate: ""
    },
    healthProblems: "",
    usualFood: "",
    specialNotes: "",
    additionalServices: {
      cleaningDecorating: false,
      specialMedicalCare: false,
      sendPicturesVideos: false
    },
    agreement: false
  });

  const handleChange = (
    e
  ) => {
    const { name, value, type, checked } = e.target;

    // Handle nested fields like "ownerInfo.firstName" or "catInfo.age"
    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        let nested = { ...prev[keys[0]] };

        nested[keys[1]] =
          type === "checkbox"
            ? checked
            : type === "number"
            ? Number(value)
            : value;

        return { ...prev, [keys[0]]: nested };
      });
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? Number(value)
            : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data to send:", formData);
    // Send to backend here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotel Reservation</h1>

      {/* Dates */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>

      {/* Arrival */}
      <div className="mb-4">
        <label>
          <input
            type="radio"
            name="estimatedArrival"
            value="Morning"
            checked={formData.estimatedArrival === "Morning"}
            onChange={handleChange}
          />{" "}
          Morning
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="estimatedArrival"
            value="Evening"
            checked={formData.estimatedArrival === "Evening"}
            onChange={handleChange}
          />{" "}
          Evening
        </label>
      </div>

      {/* Owner Info */}
      <fieldset className="border p-4 rounded mb-4">
        <legend>1. Owner Information</legend>
        <input
          name="ownerInfo.firstName"
          placeholder="First Name"
          value={formData.ownerInfo.firstName}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          name="ownerInfo.phoneNumber"
          placeholder="Phone Number"
          value={formData.ownerInfo.phoneNumber}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          name="ownerInfo.address"
          placeholder="Address"
          value={formData.ownerInfo.address}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </fieldset>

      {/* Cat Info */}
      <fieldset className="border p-4 rounded mb-4">
        <legend>2. Cat Information</legend>
        <input
          name="catInfo.catName"
          placeholder="Cat Name"
          value={formData.catInfo.catName}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          name="catInfo.breed"
          value={formData.catInfo.breed}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-2"
        >
          <option>Angora</option>
          <option>Persian</option>
          <option>Siamese</option>
        </select>
        <input
          type="number"
          name="catInfo.age"
          placeholder="Age of Cats"
          value={formData.catInfo.age}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          name="catInfo.numberOfCats"
          placeholder="Number of Cats"
          value={formData.catInfo.numberOfCats}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mb-2"
        />

        {/* Gender */}
        <div className="mb-2">
          <label>
            <input
              type="radio"
              name="catInfo.gender"
              value="Male"
              checked={formData.catInfo.gender === "Male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="catInfo.gender"
              value="Female"
              checked={formData.catInfo.gender === "Female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>

        {/* Sterilized */}
        <div className="mb-2">
          <label>
            <input
              type="radio"
              name="catInfo.sterilized"
              value="true"
              checked={formData.catInfo.sterilized === true}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "catInfo.sterilized",
                    value: "true",
                    type: "checkbox",
                    checked: true
                  }
                })
              }
            />{" "}
            Yes
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="catInfo.sterilized"
              value="false"
              checked={formData.catInfo.sterilized === false}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "catInfo.sterilized",
                    value: "false",
                    type: "checkbox",
                    checked: false
                  }
                })
              }
            />{" "}
            No
          </label>
        </div>

        {/* Vaccination */}
        <div className="mb-2">
          <label>
            <input
              type="radio"
              name="catInfo.vaccinationNotebook"
              value="Updated"
              checked={formData.catInfo.vaccinationNotebook === "Updated"}
              onChange={handleChange}
            />{" "}
            Updated
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="catInfo.vaccinationNotebook"
              value="Not updated"
              checked={formData.catInfo.vaccinationNotebook === "Not updated"}
              onChange={handleChange}
            />{" "}
            Not updated
          </label>
        </div>

        {/* Anti Parasite */}
        <div className="mb-2">
          <label>
            <input
              type="radio"
              name="catInfo.antiParasiteTreatment"
              value="true"
              checked={formData.catInfo.antiParasiteTreatment === true}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "catInfo.antiParasiteTreatment",
                    value: "true",
                    type: "checkbox",
                    checked: true
                  }
                })
              }
            />{" "}
            Yes
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="catInfo.antiParasiteTreatment"
              value="false"
              checked={formData.catInfo.antiParasiteTreatment === false}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "catInfo.antiParasiteTreatment",
                    value: "false",
                    type: "checkbox",
                    checked: false
                  }
                })
              }
            />{" "}
            No
          </label>
        </div>

        <input
          type="date"
          name="catInfo.lastTreatmentDate"
          value={formData.catInfo.lastTreatmentDate}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </fieldset>

      {/* Health Problems */}
      <textarea
        name="healthProblems"
        placeholder="Write problems here"
        value={formData.healthProblems}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full mb-4"
      />

      {/* Usual Food */}
      <textarea
        name="usualFood"
        placeholder="The usual food"
        value={formData.usualFood}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full mb-4"
      />

      {/* Special Notes */}
      <textarea
        name="specialNotes"
        placeholder="Special notes or behavior"
        value={formData.specialNotes}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Additional Services */}
      <fieldset className="border p-4 rounded mb-4">
        <legend>3. Additional Services</legend>
        <label>
          <input
            type="checkbox"
            name="additionalServices.cleaningDecorating"
            checked={formData.additionalServices.cleaningDecorating}
            onChange={handleChange}
          />{" "}
          Cleaning / Decorating during the stay
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="additionalServices.specialMedicalCare"
            checked={formData.additionalServices.specialMedicalCare}
            onChange={handleChange}
          />{" "}
          Special medical care
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="additionalServices.sendPicturesVideos"
            checked={formData.additionalServices.sendPicturesVideos}
            onChange={handleChange}
          />{" "}
          Send pictures/videos during the stay
        </label>
      </fieldset>

      {/* Agreement */}
      <label>
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
        />{" "}
        I acknowledge the terms of the Cat Hotel...
      </label>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}