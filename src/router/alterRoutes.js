const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// Trigger Alert Route
router.post('/alert', alertController.triggerAlert);

module.exports = router;
