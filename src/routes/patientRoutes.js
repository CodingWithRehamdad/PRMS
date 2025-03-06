const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const {registerPatient, getPatients, getPatientById, updatePatient, deletePatient, uploadPatientReports, getPatientReports} = require('../controllers/patientController')
const { upload } = require('../middlewares/reportsMiddleware')


const router = express.Router()

router.post('/new-patient', registerPatient)
router.get('/patients', auth, roleMiddleware('admin', 'doctor', 'receptionist', 'nurse'), getPatients)
router.get('/patient/:id', roleMiddleware('admin', 'doctor', 'receptionist', 'nurse'), auth, getPatientById)
router.patch('/update-patient/:id', auth, roleMiddleware('admin', 'doctor', 'receptionist'), updatePatient)
router.delete('/delete-patient/:id', auth, roleMiddleware('admin'), deletePatient)

router.post('/upload-reports/:id', auth, roleMiddleware('patient', 'doctor', 'admin'), upload.array('reports', 10), uploadPatientReports)
router.get('/reports/:id', auth, roleMiddleware('admin', 'patient', 'doctor'), getPatientReports)

module.exports = router
