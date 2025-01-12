const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({ message: 'An internal server error occurred.' });
};

module.exports = errorHandler;
