const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    patient: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
    },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["Paid", "Pending", "Failed"], required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["Cash", "Credit Card", "Insurance", "Bank Transfer"], required: true }
});

module.exports = mongoose.model("Payment", PaymentSchema);