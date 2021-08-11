// Dependencies
const express = require('express');
const router = express.Router();
const Items = require('./routes/Items');

// Implement Items apis
router.use('/api/items', Items);

module.exports = router;