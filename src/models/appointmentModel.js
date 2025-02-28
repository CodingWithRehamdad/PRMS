const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected', 'rescheduled', 'completed'],
        default: 'pending'
    },
    reason: {
        type: String, 
    },
    notes: {
        type: String 
    },
    receptionist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

    
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
