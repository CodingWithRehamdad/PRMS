const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerDoctor = async (req, res) => {
    const { username, email, phone, address, gender, age, password, doctorDetails } = req.body;
    
    try {
        const existDoctor = await User.findOne({ email });
        if (existDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        // Create doctor user
        const doctor = new User({
            username, email, phone, address, gender, age, password, role: "doctor"
        });
        await doctor.save();

        // Create doctor details
        const doctorDetail = new Doctor({
            userId: doctor._id,
            doctorDetails: {
                qualifications: doctorDetails.qualifications,
                licenseNumber: doctorDetails.licenseNumber,
                specialization: doctorDetails.specialization,
                yearsOfExperience: doctorDetails.yearsOfExperience,
                department: doctorDetails.department,
                workSchedule: doctorDetails.workSchedule
            }
        });
        await doctorDetail.save();

        const token = generateToken(doctor);
        res.status(201).json({ message: "Doctor created successfully", doctor, token });
    } catch (error) {
        console.error("Error registering doctor:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate({
                path: "userId",
                select: "username phone"
            })
            .select("doctorDetails.specialization doctorDetails.workSchedule userId");

        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error", error: error.message });
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

const updateDoctor = async(req, res) =>{
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
    updateDoctor,
    deleteDoctor
}