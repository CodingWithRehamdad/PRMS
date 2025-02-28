const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerDoctor = async(req, res) => {
    const { username, email, phone, address, gender, age, password, role, doctorDetails} = req.body
    try {
        const doctor = new User({username, email, phone, address , gender, age, password, role: 'doctor'})
        const existDoctor = await User.findOne({email})
        if (existDoctor) {
            return res.status(400).json({message: "Doctor already existed"})
        }
        await doctor.save()
        const doctorDetail = new Doctor({userId: doctor._id, doctorDetails})
        await doctorDetail.save()

        const token = generateToken(doctor)
        res.status(201).json({message: "Doctor created successfyly", doctor, token})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const getAllDoctors = async(req, res) => {
    try {
        const doctors = await User.find({role: "doctor"}).populate("username email phone role")
        res.status(200).json(doctors)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const getDoctorById = async(req, res) => {
    const {id} = req.params
    try {
        const doctor = await User.findById(id)
        if (!doctor) {
            return res.status(404).json({message: "Doctor not found"})
        }
        const doctorDetails = await Doctor.findOne({userId: id})
        res.status(200).json({doctor, doctorDetails})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const updateDcotor = async(req, res) =>{
    const {id} = req.params
    try {
        const doctor = await User.findByIdAndUpdate({_id: id}, req.body, {new: true})
        if (!doctor) {
            return res.status(404).json({message: "Doctor not found"})
        }
        const doctorDetails = await Doctor.findOneAndUpdate({userId: id})
        res.status(200).json({message: "Doctor updated successfully", doctor, doctorDetails})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deleteDoctor = async(req, res) => {
    const { id } = req.params
    try {
        const doctor = await User.findByIdAndDelete(id)
        if (!doctor) {
            return res.status(404).json({message: "Doctor not found"})
        }
        await Doctor.findOneAndDelete({userId: id})
        res.status(200).json({message: "Doctor deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

module.exports = {
    registerDoctor,
    getAllDoctors,
    getDoctorById,
    updateDcotor,
    deleteDoctor
}