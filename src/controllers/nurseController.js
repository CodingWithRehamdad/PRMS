const Nurse = require('../models/nurseModel')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerNurse = async (req, res) => {
    const { username, email, phone, gender, address, role, password, nurseDetails } = req.body;
    try {
      const existingNurse = await User.findOne({ email });
      if (existingNurse) {
        return res.status(400).json({ message: "Nurse already found" });
      }
      const nurse = new User({ username, email, phone, gender, address, role: "nurse", password });
      await nurse.save();

      const nurseDetail = new Nurse({ userId: nurse._id, nurseDetails });
      await nurseDetail.save(); 

      const token = generateToken(nurse);
      res.status(201).json({ message: "Nurse created successfully!", nurse, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const getNurses = async(req, res) =>{
    try {
        const nurses = await User.find({role: "nurse"}).populate("username email phone role")
        res.status(200).json(nurses)
    } catch (error) {
        res.status(500).json({mesage: "Server error", error: error.message})
    }
};

const getNurseById = async (req, res) =>{
    const { id } = req.params
    try {
        const nurse = await User.findById(id)
        if(!nurse) {
            return res.status(404).json({message: "Nurse not found"})
        }
        const nurseDetail = await Nurse.findOne({userId: id})
        res.status(200).json({nurse, nurseDetail})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.mesage})
    }
};

const updateNurse = async(req, res) =>{
    const { id } = req.params
    try {
        const nurse = await User.findByIdAndUpdate({_id: id}, req.body, {new: true})
        if (!nurse) {
            return res.status(404).json({message: "Nurse not found"})
        }
        const nurseDetail = await Nurse.findOneAndUpdate({userId: id})
        res.status(200).json({message: "Nurse updated successfully", nurse, nurseDetail})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.mesage})
    }
};

const deleteNurse = async(req, res) => {
    const { id } = req.params
    try {
        const nurse = await User.findByIdAndDelete(id)
        if (!nurse) {
            return res.status(404).json({message: "Nurse not found"})
        }
        await Nurse.findOneAndDelete({userId: id})
        res.status(200).json({message: "Nurse deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.mesage})
    }
};


module.exports = {
    registerNurse,
    getNurses,
    getNurseById,
    updateNurse,
    deleteNurse
}