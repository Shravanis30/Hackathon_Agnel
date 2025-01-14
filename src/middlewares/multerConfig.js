const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
module.exports = upload;



// const multer = require('multer');

// // Multer setup to save uploaded files temporarily
// const upload = multer({ dest: 'uploads/' });

// module.exports = upload;