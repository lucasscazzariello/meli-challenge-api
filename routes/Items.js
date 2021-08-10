"use strict";

const express = require('express');
const routes = express.Router();
const items = require('../controllers/Items');

routes.get('/', items.getItems);
routes.get('/:id', items.getItemById);

module.exports = routes;