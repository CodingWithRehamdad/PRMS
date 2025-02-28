const mongoose = require('mongoose')

const nurseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nurseDetails: {
        qualifications: 
        {
            type: String
        },
        specialization: {
            type: String
        },
        licenseNumber: {
            type: String
        },
        yearsOfExperience: {
            type: String
        },
        assignedDoctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        workSchedule: {
            type: String
        },
    }
    

}, {timestamps: true})

const Nurse = mongoose.model('Nurse', nurseSchema)

module.exports = Nurse