
const express = require("express");
const {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require("../controllers/reservations.js");
const {authMiddleware , adminAuth} = require("../middleware/authentication.js");

const router = express.Router();

router.post("/", createReservation);
router.get("/",authMiddleware , adminAuth, getReservations);
router.get("/:id",authMiddleware , adminAuth, getReservationById);
router.patch("/:id",authMiddleware , adminAuth, updateReservation);
router.delete("/:id",authMiddleware , adminAuth, deleteReservation);

module.exports = router;
