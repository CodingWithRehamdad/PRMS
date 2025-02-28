const User = require('../models/userModel')
const Receptionist = require('../models/receptionistModel')
const generateToken = require('../utils/generateToken')

const registerReceptionist = async(req, res) => {
    const { username, email, phone, address, role, password, gender, receptionistDetails } = req.body
    try {
        const receptionist = new User({username, email, phone, address, role, password, gender})
        const existReceptionist = await User.findOne({email})
        if (existReceptionist) {
            return res.status(400).json({message: "Receptionist already existed"})
        }
        await receptionist.save()

        const receptionistDetail = new Receptionist({userId: receptionist._id, receptionistDetails})
        await receptionistDetail.save()
        
        const token = generateToken(receptionist)
        res.status(201).json({message: "Receptionist created successfully", receptionist, token})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    } 
}

const getReceptionists = async(req, res) =>{
    try {
        const receptionists = await User.find({role: "receptionist"}).populate("username email phone role")
        res.status(200).json(receptionists)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
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