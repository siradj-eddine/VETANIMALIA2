
const Reservation = require("../models/reservations.js");

// Create new reservation
 const createReservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.status(201).json({ reservation });
};

// Get all reservations
 const getReservations = async (req, res) => {
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json({ reservations });
};

// Get single reservation
 const getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return res.status(404).json({ success: false, message: "Reservation not found" });
  }
  res.json({  reservation });
};

// Update reservation
 const updateReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }
  res.json({ success: true, reservation });
};

// Delete reservation
 const deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    return res.status(404).json({ success: false, message: "Reservation not found" });
  }
  res.json({ success: true, message: "Reservation deleted" });
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};
