const Appointment = require('../models/appointmentModel')
const Patient = require('../models/patientModel')
const User = require('../models/userModel')

const createAppointment = async (req, res) => {
    try {
        const { patient, doctor, date, reason, notes, startTime, endTime } = req.body;
        const user = await User.findOne({ _id: patient, role: "patient" })

        if (!user) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const appointment = await Appointment.create({patient: user._id, doctor, date, startTime, endTime, reason, notes });

        return res.status(201).json({ message: "Appointment created successfully", appointment });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient", "username email phone age gender"); // Fetch patient details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

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