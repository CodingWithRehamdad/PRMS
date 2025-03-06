const express = require('express');
const { auth, roleMiddleware } = require('../middlewares/authMiddleware');
const { registerNurse, getNurses, getNurseById, updateNurse, deleteNurse } = require('../controllers/nurseController');
const router = express.Router();

router.post('/new-nurse', auth, roleMiddleware('admin'), registerNurse);
router.get('/nurses', auth, roleMiddleware('admin', 'receptionist'), getNurses);
router.get('/nurse/:id', auth, roleMiddleware('admin', 'receptionist'), getNurseById);
router.patch('/update-nurse/:id', auth, roleMiddleware('admin'), updateNurse);
router.delete('/delete-nurse', auth, roleMiddleware('admin'), deleteNurse);

module.exports = router;
