const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name : {
        type: String,
        required: [true, 'Client name is required']
    },
    kind: {
        type: String,
        required: [true , 'Pet kind is required']
    },
    breed: {
        type: String,
        required: [true, 'Pet breed is required']
    },
    symptoms: {
        type: String,
        required: [true, 'Symptoms are required']
    },
    date: {
        type: Date,
        required: [true, 'appointment date is required']
    },
    additionalInfo: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);