// // routes/emergencyRoutes.js

// const express = require('express');
// const { getEmergencyContacts } = require('../controllers/emergencyController');

// const router = express.Router();

// // Route: Fetch Emergency Contacts
// router.get('/', getEmergencyContacts);

// module.exports = router;





const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Emergency Contacts Fetch Route
router.get('/emergency-contacts', emergencyController.getEmergencyContacts);

module.exports = router;
