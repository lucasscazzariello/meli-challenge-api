// Dependencies
const express = require('express');
const router = express.Router()

// Default route
router.get('*', (req, res) => {
    res.status(404).json({ message: 'Bad request' })
});

// Default error
router.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Internal server error',
        data: err.toString()
    });
});

module.exports = router