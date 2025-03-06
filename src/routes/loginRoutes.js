const { login, logout, getProfile } = require('../controllers/adminController')
const { auth, roleMiddleware } = require('../middlewares/authMiddleware')
const express = require('express')
const router = express.Router()



router.post('/login', login)
router.post('/logout', auth, logout)
router.get('/profile', auth, getProfile)


module.exports = router