const express = require('express')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const {registerReceptionist, getReceptionists, getReceptionistById, updateReceptionist, deleteReceptionist} = require('../controllers/receptionistController')

const router = express.Router()

router.post('/new-receptionist', auth, registerReceptionist, roleMiddleware('admin'))
router.get('/receptionists', auth, getReceptionists, roleMiddleware('admin'))
router.get('/receptionist/:id', auth, getReceptionistById, roleMiddleware('admin'))
router.patch('/update-receptionist/:id', auth, updateReceptionist, roleMiddleware('admin'))
router.delete('delete-receptionist/:id', auth, deleteReceptionist, roleMiddleware('admin'))

module.exports = router