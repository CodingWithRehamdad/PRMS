const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const { createAppointment, updateAppointment, getAppointmentById, getAppointments, deleteAppointment } = require('../controllers/appointmentController')
const router = express.Router()

router.post("/create-appointment", auth, roleMiddleware("admin", "patient", "receptionist"), createAppointment);
router.get("/appointments", auth, roleMiddleware("admin", "receptionist", "doctor"), getAppointments);
router.get('/appointment/:id', auth, roleMiddleware('admin', 'patient', 'receptionist'), getAppointmentById)
router.patch('/update-appointment/:id', auth, roleMiddleware('admin','receptionist'), updateAppointment)
router.delete('/delete-appointment/:id', auth, roleMiddleware('admin', 'receptionist'), deleteAppointment)

module.exports = router