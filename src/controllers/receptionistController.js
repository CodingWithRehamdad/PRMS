const User = require('../models/userModel')
const Receptionist = require('../models/receptionistModel')
const generateToken = require('../utils/generateToken')

const registerReceptionist = async(req, res) => {
    const { username, email, phone, address, role, age, password, gender, emergencyContact, receptionistDetails } = req.body
    try {
        const receptionist = new User({username, email, phone, age, address, role, password, gender, emergencyContact})
        const existReceptionist = await User.findOne({email})
        if (existReceptionist) {
            return res.status(400).json({message: "Receptionist already existed"})
        }
        await receptionist.save()

        const receptionistDetail = new Receptionist({
            userId: receptionist._id, 
            receptionistDetails: {
                employeeId: receptionistDetails?.employeeId || "",
                yearsOfExperience: receptionistDetails?.yearsOfExperience || "",
                workSchedule: receptionistDetails?.workSchedule || ""
            }
        });
        await receptionistDetail.save();
        
        const token = generateToken(receptionist)
        res.status(201).json({message: "Receptionist created successfully", receptionist, token})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    } 
}

const getReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.find().populate("userId", "username phone age");

        if (!receptionists.length) return res.status(404).json({ message: "No receptionists found" });

        res.status(200).json(receptionists.map(({ _id, userId, receptionistDetails }) => ({
            _id,
            username: userId?.username || "N/A",
            phone: userId?.phone || "N/A",
            age: userId?.age || "N/A",
            workSchedule: receptionistDetails?.workSchedule || "N/A"
        })));
    } catch (error) {
        console.error("Error fetching receptionists:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getReceptionistById = async(req, res) => {
    const { id } = req.params
    try {
        const receptionist = await User.findById(id)
        if(!receptionist) {
            return res.status(404).json({message: "Receptionist not found"})
        }
        const receptionistDetail = await Receptionist.findOne({userId: id})
        res.status(200).json({receptionist, receptionistDetail})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const updateReceptionist = async(req, res) =>{
    const { id } = req.params
    try {
        const receptionist = await User.findByIdAndUpdate({_id: id}, req.body, {new: true})
        if (!receptionist) {
            return res.status(404).json({message: "Receptionist not found"})
        }
       const receptionistDetail = await Receptionist.findOneAndUpdate({userId: id})
        res.status(200).json({message: "Receptionist Updated", receptionist, receptionistDetail})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deleteReceptionist = async(req, res) =>{
    const { id } = req.params
    try {
        const receptionist = await Receptionist.findByIdAndDelete(id)
        if (!receptionist) {
            return res.status(404).json({message: "Receptionist not found"})
        }
        await Receptionist.findOneAndDelete({userId: id})
        res.status(200).json({message: "Receptionist deleted"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

module.exports = {
    registerReceptionist,
    getReceptionists,
    getReceptionistById,
    updateReceptionist,
    deleteReceptionist
}