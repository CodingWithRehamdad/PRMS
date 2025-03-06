const mongoose = require('mongoose')

const nurseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nurseDetails: {
        qualifications: {
            type: String,
            default: ""
        },
        specialization: {
            type: String,
            default: ""
        },
        licenseNumber: {
            type: String,
            default: ""
        },
        yearsOfExperience: {
            type: Number,
            default: 0
        },
        department: {
            type: String,
            default: ""
        },
        assignedDoctor: {
            type: String,
            default: ""
        },
        workSchedule: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

const Nurse = mongoose.model('Nurse', nurseSchema)

module.exports = Nurse