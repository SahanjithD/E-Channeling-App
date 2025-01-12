const express = require('express');
const { getAppointments, createAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.delete('/:id', authenticateToken, deleteAppointment);

module.exports = router;
