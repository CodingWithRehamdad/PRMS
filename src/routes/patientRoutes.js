const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const {registerPatient, getPatients, getPatientById, updatePatient, deletePatient, uploadPatientReports, getPatientReports} = require('../controllers/patientController')
const { upload } = require('../middlewares/reportsMiddleware')


const router = express.Router()

router.post('/new-patient', registerPatient)
router.get('/patients', auth, getPatients, roleMiddleware('admin', 'doctor', 'receptionist', 'nurse'))
router.get('/patient/:id', auth, getPatientById, roleMiddleware('admin', 'doctor', 'receptionist', 'nurse'))
router.patch('/update-patient/:id', auth, updatePatient, roleMiddleware('admin', 'doctor', 'receptionist'))
router.delete('/delete-patient/:id', auth, deletePatient, roleMiddleware('admin'))

router.post('/upload-reports/:id', auth, roleMiddleware('patient', 'doctor', 'admin'), upload.array('reports', 10), uploadPatientReports)
router.get('/reports/:id', auth, roleMiddleware('admin', 'patient', 'doctor'), getPatientReports)

module.exports = router
