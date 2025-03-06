const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicalHistory: {
        chronicConditions: {
            type: String
        },
        postProcedures: {
            type: String
        },
        allergies: {
            type: String
        },
        familyHistory: {
            type: String
        },
        lifestyle: {
            type: String
        }
    },
    medications: [{
        name: {
            type: String
        },
        dosage: {
            type: String
        },
        frequency: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        notes: {
            type: String
        }
    }],
    insurance: {
        provider: {
            type: String
        },
        policyNumber: {
            type: String
        }
    },
    reports: {
        type: [{
            fileName: String,
            filePath: String,
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
        ]
    },

}, { timestamps: true })

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient