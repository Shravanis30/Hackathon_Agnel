// const express = require('express');
// const { sendSOSRequest, getSOSRequests } = require('../controllers/sosController');

// const router = express.Router();

// router.post('/', sendSOSRequest);  // Save SOS request
// router.get('/', getSOSRequests);  // Fetch SOS requests

// module.exports = router;






const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');

// SOS Activation Route
router.post('/sos', sosController.activateSos);

// Retrieve SOS Requests Route
router.get('/sos-requests', sosController.getSosRequests);

module.exports = router;
