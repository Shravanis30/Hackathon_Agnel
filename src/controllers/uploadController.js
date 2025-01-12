const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    return res.status(200).json({ message: 'File uploaded successfully!', file });
};
