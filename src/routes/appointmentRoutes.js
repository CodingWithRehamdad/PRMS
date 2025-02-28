const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const { createAppointment, updateAppointment, getAppointmentById, getAppointments, deleteAppointment } = require('../controllers/appointmentController')
const router = express.Router()

router.post('/create-appointment', auth, roleMiddleware('patient', 'receptionist'), createAppointment)
router.get('/appointments', auth, roleMiddleware('receptionist', 'doctor'), getAppointments)
router.get('/appointment/:id', auth, roleMiddleware('receptionist', 'doctor'), getAppointmentById)
router.patch('/update-appointment/:id', auth, roleMiddleware('patient', 'receptionist'), updateAppointment)
router.delete('/delete-appointment/:id', auth, roleMiddleware('receptionist'), deleteAppointment)

module.exports = router