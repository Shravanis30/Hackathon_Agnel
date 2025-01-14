
const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Emergency Contacts Fetch Route
router.get('/emergency-contacts', emergencyController.getEmergencyContacts);

module.exports = router;
