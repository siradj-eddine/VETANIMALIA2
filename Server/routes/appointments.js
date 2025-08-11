const express = require('express');
const appointmentsController = require('../controllers/appointments');

const router = express.Router();

// Example routes
router.get('/', appointmentsController.getAllAppointments);
router.get('/:id', appointmentsController.getAppointmentById);
router.post('/', appointmentsController.createAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;