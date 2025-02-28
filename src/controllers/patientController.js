const Patient = require('../models/patientModel')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerPatient = async (req, res) =>{
    const { username, email, phone, address, gender, password, role, medicalHistory, medications, insurance, reports, emergencyContact } = req.body
    try {
        const patient = new User({username, email, phone, address, gender, password, role, medicalHistory, medications, insurance, reports, emergencyContact})
        const existPatient = await User.findOne({email})
        if (existPatient) {
            return res.status(400).json({message: "Patient already found"})
        }
        await patient.save()

        const patientDetails = new Patient({
            userId: patient._id,
            medicalHistory: medicalHistory || {},
            medications: medications || {},
            insurance: insurance || {},
        })
        await patientDetails.save()

        patient.patient= patientDetails._id
        await patient.save()

        const token = generateToken(patient)
        res.status(201).json({message: "Patient created successfully", patient, token})
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const getPatients = async(req, res) => {
    try {
        const patients = await User.find({role: "patient"}).populate("username email phone role")
        res.status(200).json(patients)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
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