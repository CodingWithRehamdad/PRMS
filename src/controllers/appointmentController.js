const Appointment = require('../models/appointmentModel')
const User = require('../models/userModel')

const createAppointment = async(req, res) =>{
    const { patientId, doctorId, date, reason, notes } = req.body
    try {
        const findPatient = await User.findById(patientId)
        const findDoctor = await User.findById(doctorId)
        const appointment = new Appointment({patient: findPatient._id, doctor: findDoctor._id, date, reason, notes})
        await appointment.save()

        res.status(201).json({message: "Appointment Created", appointment})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const getAppointments = async(req, res) =>{
    try {
        const appointments = await Appointment.find()
        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const getAppointmentById = async(req, res) =>{
    const { id } = req.params
    try {
        const appointment = await Appointment.findById(id)
        if(!appointment){
            return res.status(404).json({message: "Appointment not found"})
        }
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const updateAppointment = async(req, res) =>{
    const { id } = req.params
    try {
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, {new: true})
        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"})
        }
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deleteAppointment = async(req, res) =>{
    const { id } = req.params
    try {
        const appointment = await Appointment.findByIdAndDelete(id)
        if (!appointment) {
            return res.status(404).json({message: "Appointment not found"})
        }
        res.status(200).json({message: "Appointment deleted"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};


module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}