"use strict";

const express = require('express');
const routes = express.Router();
const { getItems, getItemById } = require('../controllers/Items');

routes.get('/', getItems);
routes.get('/:id', getItemById);

module.exports = routes;