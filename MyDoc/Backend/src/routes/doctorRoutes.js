const express = require('express');
const { getDoctors, searchDoctors } = require('../controllers/doctorController');

const router = express.Router();

router.get('/', getDoctors);
router.get('/search', searchDoctors);

module.exports = router;
