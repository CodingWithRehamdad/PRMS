const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const {registerNurse, getNurses, getNurseById, updateNurse, deleteNurse} = require('../controllers/nurseController')
const router = express.Router()

router.post('/new-nurse', auth, registerNurse, roleMiddleware('admin'))
router.get('/nurses', auth, getNurses, roleMiddleware('admin', 'receptionist'))
router.get('/nurse/:id', auth, getNurseById, roleMiddleware('admin', 'receptionist'))
router.patch('/update-nurse/:id', auth, updateNurse, roleMiddleware('admin'))
router.delete('/delete-nurse', auth, deleteNurse, roleMiddleware('admin'))

module.exports = router