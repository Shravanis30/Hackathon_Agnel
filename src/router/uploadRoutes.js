// // routes/uploadRoutes.js

// const express = require('express');
// const multer = require('multer');
// const { uploadFile } = require('../controllers/uploadController');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// // Route: Handle File Uploads
// router.post('/', upload.single('file'), uploadFile);

// module.exports = router;




const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Upload Route for Audio or Video Files
router.post('/upload', uploadController.uploadFile);

module.exports = router;
