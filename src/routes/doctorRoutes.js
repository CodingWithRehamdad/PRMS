const express = require('express');
const { auth, roleMiddleware } = require('../middlewares/authMiddleware');
const { registerDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

const router = express.Router();

router.post('/new-doctor', auth, roleMiddleware('admin'), registerDoctor);
router.get('/doctors', auth, roleMiddleware('admin', 'receptionist'), getAllDoctors);
router.get('/doctor/:id', auth, roleMiddleware('admin', 'receptionist'), getDoctorById);
router.patch('/update-doctor/:id', auth, roleMiddleware('admin'), updateDoctor); // Fixed spelling
router.delete('/delete-doctor/:id', auth, roleMiddleware('admin'), deleteDoctor);

module.exports = router;
