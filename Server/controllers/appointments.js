const { StatusCodes } = require('http-status-codes');
const Appointment = require('../models/appointments');
const NotFound = require('../errors/NotFound');
const Unauthenticated = require('../errors/Unauthenticated');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    const appointments = await Appointment.find().populate('user', 'name');
    res.status(StatusCodes.OK).json(appointments);
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    const {id : appointmentID} = req.params
    const appointment = await Appointment.findById({_id : appointmentID});
    if (!appointment) throw new NotFound(`No appointment with the id : ${appointmentID}`);
    res.status(StatusCodes.OK).json(appointment);
};

// Create new appointment
exports.createAppointment = async (req, res) => {
    const {name , date, breed , kind , symptoms , additionalInfo} = req.body;
    if(req.user) {
        const appointment = await Appointment.create({name , date, breed, kind, symptoms, additionalInfo, user: req.user.userID});
        res.status(StatusCodes.CREATED).json(appointment);
    }else{
            const appointment = await Appointment.create({name , date, breed, kind, symptoms, additionalInfo});
        res.status(StatusCodes.CREATED).json(appointment);
    
    }
};

// Update appointment
// exports.updateAppointment = async (req, res) => {
//     const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
//     res.json(appointment);
// };

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    const {id : appointmentID} = req.params
    const appointment = await Appointment.findByIdAndDelete({_id : appointmentID});
    if (!appointment) throw new NotFound(`No appointment with the id : ${appointmentID}`);
    res.status(StatusCodes.OK).send("appointment deleted");
};
