// Dependencies
const express = require('express');
const router = express.Router();
const Items = require('./routes/Items');

// Implement Items apis
router.use('/api/items', Items);

// Default route
router.get('*', (req, res) => {
    res.status(404).json({ message: 'Bad request' });
});

// Default error
router.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Internal server error',
        data: err.toString()
    });
});

module.exports = router;