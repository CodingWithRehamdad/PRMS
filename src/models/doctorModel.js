const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorDetails: {
        qualifications: {
            type: String,
        },
        licenseNumber: {
            type: String
        },
        specialization: {
            type: String,
        },
        yearsOfExperience: {
            type: String,
            default: 0
        },
        department: {
            type: String
        },
        workSchedule: {
            type: String
        }
    }

},{timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor