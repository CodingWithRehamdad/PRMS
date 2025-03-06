const Nurse = require('../models/nurseModel')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerNurse = async (req, res) => {
    try {
        const { username, email, phone, age, gender, address, password, qualifications, specialization, licenseNumber, yearsOfExperience, assignedDoctor, workSchedule, department } = req.body;
        
        // Check if the nurse already exists
        const existingNurse = await User.findOne({ email });
        if (existingNurse) {
            return res.status(400).json({ message: "Nurse already exists" });
        }
        const nurse = new User({ username, email, phone, gender, age, address, role: "nurse", password});
        await nurse.save();
        
        // Create Nurse entry
        const nurseDetail = new Nurse({
            userId: nurse._id,
            nurseDetails: {
                qualifications,
                specialization,
                licenseNumber,
                yearsOfExperience: Number(yearsOfExperience),
                assignedDoctor,
                workSchedule,
                department,
            },
        }); 
        await nurseDetail.save();
        
        const token = generateToken(nurse);
        return res.status(201).json({ message: "Nurse created successfully!", nurse, token });
    } catch (error) {
        console.error("Error registering nurse:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getNurses = async (req, res) => {
    try {
        // Fetch all nurses with their user details
        const nurses = await Nurse.find()
            .populate({
                path: "userId",
                select: "username phone email" // Fetch basic user details
            })
            .select("userId nurseDetails"); // Ensure `nurseDetails` is included

        console.log("Fetched nurses:", nurses); // ✅ Debugging output
        res.status(200).json(nurses);
    } catch (error) {
        console.error("Error fetching nurses:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getNurseById = async (req, res) => {
    const { id } = req.params
    try {
        const nurse = await User.findById(id)
        if (!nurse) {
            return res.status(404).json({ message: "Nurse not found" })
        }
        const nurseDetail = await Nurse.findOne({ userId: id })
        res.status(200).json({ nurse, nurseDetail })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.mesage })
    }
};

const updateNurse = async (req, res) => {
    const { id } = req.params
    try {
        const nurse = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        if (!nurse) {
            return res.status(404).json({ message: "Nurse not found" })
        }
        const nurseDetail = await Nurse.findOneAndUpdate({ userId: id })
        res.status(200).json({ message: "Nurse updated successfully", nurse, nurseDetail })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.mesage })
    }
};

const deleteNurse = async (req, res) => {
    const { id } = req.params
    try {
        const nurse = await User.findByIdAndDelete(id)
        if (!nurse) {
            return res.status(404).json({ message: "Nurse not found" })
        }
        await Nurse.findOneAndDelete({ userId: id })
        res.status(200).json({ message: "Nurse deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.mesage })
    }
};


module.exports = {
    registerNurse,
    getNurses,
    getNurseById,
    updateNurse,
    deleteNurse
}