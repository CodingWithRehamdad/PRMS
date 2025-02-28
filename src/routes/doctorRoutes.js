const express = require('express')
const { auth, roleMiddleware} = require('../middlewares/authMiddleware')
const {registerDoctor, getAllDoctors, getDoctorById, updateDcotor, deleteDoctor} = require('../controllers/doctorController')

const router = express.Router()

router.post('/new-doctor', auth, registerDoctor, roleMiddleware('admin'))
router.get('/doctors', auth, getAllDoctors, roleMiddleware('admin', 'receptionist'))
router.get('/doctor/:id', auth, getDoctorById, roleMiddleware('admin', 'receptionist'))
router.patch('/update-doctor/:id', auth, updateDcotor, roleMiddleware('admin'))
router.delete('/delete-doctor/:id', auth, deleteDoctor, roleMiddleware('admin'))

module.exports = router