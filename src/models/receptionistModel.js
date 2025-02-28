const mongoose = require('mongoose')

const receptionistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receptionistDetails: {
        employeeId: {
            type: String
        },
        yearsOfExperience: {
            type: String
        },
        department: {
            type: String
        },
        workSchedule: {
            type: String
        }
    },

}, {timestamps: true})

const Receptionist = mongoose.model('Receptionist', receptionistSchema)

module.exports = Receptionist