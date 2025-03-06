const Patient = require('../models/patientModel')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerPatient = async (req, res) => {
    try {
        const { username, email, phone, address, gender, age, password, emergencyContact, medicalHistory, medications, insurance, reports } = req.body;

        if (await User.exists({ email })) 
            return res.status(400).json({ message: "Patient already exists" });

        const patient = await new User({ username, email, phone, address, age, gender, password, role: "patient", emergencyContact }).save();
        const patientDetails = await new Patient({ userId: patient._id, medicalHistory, medications, insurance, reports }).save();

        res.status(201).json({ message: "Patient registered successfully", patient, token: generateToken(patient) });

    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("userId", "username email phone age gender createdAt");

        if (!patients.length) 
            return res.status(404).json({ message: "No patients found" });

        res.status(200).json(patients.map(({ _id, userId }) => ({
            _id, username: userId?.username || "N/A", email: userId?.email || "N/A",
            phone: userId?.phone || "N/A", age: userId?.age || "N/A",
            gender: userId?.gender || "N/A",
            createdAt: userId?.createdAt ? new Date(userId.createdAt).toISOString() : "N/A"
        })));

    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getPatientById = async(req, res) => {
    const { id } = req.params
    try {
        const patient = await User.findById(id)
        if(!patient) {
            return res.status(404).json({message: "Patient not found"})
        }
        const patientDetails = await Patient.findOne({ userId: id });
        
        res.status(200).json({ patient, patientDetails})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const updatePatient = async(req, res) => {
    const { id } = req.params
    try {
        const patient = await User.findByIdAndUpdate({_id: id}, req.body, {new: true})
        if(!patient) {
            return res.status(404).json({message: "Patient not found"})
        }
        const patientDetails = await Patient.findOneAndUpdate
        ({userId: id}, req.body, {new: true})

        res.status(200).json({message: "Patient updated successfully", patient, patientDetails})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const deletePatient = async(req, res) => {
    const { id } = req.params
    try {
        const patient = await User.findByIdAndDelete(id)
        if (!patient) {
            return res.status(404).json({message: "Patient not found"})
        }
        await Patient.findOneAndDelete({userId: id})

        res.status(200).json({message: "Patient deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const uploadPatientReports = async(req, res) => {
    const { id } = req.params
    try {
        const patient = await User.findById(id)
        const patientDetails = await Patient.findOne({userId: id})

        const uploadedReports = req.files.map((file) => ({
            fileName: file.filename,
            filePath: `../uploads/${file.filename}`,
            uploadedAt: new Date(),
          }));

        patientDetails.reports = patientDetails.reports.concat(uploadedReports)
        await patientDetails.save()

        res.status(200).json({message: "Reports uploaded successfully", uploadedReports})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const getPatientReports = async(req, res) => {
    const { id } = req.params
    try {
        const patient = await User.findById(id)
        const patientDetails = await Patient.findOne({userId: id})

        res.status(200).json({reports: patientDetails.reports})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

module.exports = {
    registerPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    uploadPatientReports,
    getPatientReports
}