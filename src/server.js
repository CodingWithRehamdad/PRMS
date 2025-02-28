const express = require('express')
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const patientRoutes = require('./routes/patientRoutes')
const nurseRoutes = require('./routes/nurseRoutes')
const receptionistRoutes = require('./routes/receptionistRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes')

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())

connectDB()

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

app.listen(port, () =>{
    console.log(`App is listening at port: ${port}`)
})