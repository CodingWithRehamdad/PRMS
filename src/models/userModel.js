const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'nurse', 'patient', 'receptionist'],
        default: 'patient'
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },

}, { timestamp: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User