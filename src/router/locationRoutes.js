const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Live Location Update Route
router.post('/update-location', locationController.updateLocation);

module.exports = router;
