const cors = require("cors");
const express = require('express')
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const nurseRoutes = require('./routes/nurseRoutes')
const receptionistRoutes = require('./routes/receptionistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes')
const loginRoutes = require('./routes/loginRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

connectDB()


// Login routes
app.use('/api/login', loginRoutes)

// register admin
app.use('/api/', adminRoutes)

// register Doctor
app.use('/api/', doctorRoutes)

// register patient
app.use('/api/', patientRoutes)

// register Nurse
app.use('/api/', nurseRoutes)

// register receptionist
app.use('/api/', receptionistRoutes)

// appointment
app.use('/api/', appointmentRoutes)

// Payments
app.use('/api', paymentRoutes)

app._router.stack.forEach((r) => {
    if (r.route) {
        console.log(`✅ Method: ${Object.keys(r.route.methods).join(", ").toUpperCase()} - Path: ${r.route.path}`);
    }
});

app.listen(port, () =>{
    console.log(`App is listening at port: ${port}`)
})