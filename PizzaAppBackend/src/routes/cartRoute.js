const express = require('express');
const getCartById = require('../controllers/cartController');

const cartRouter = express.Router();

// lacalhost:5002/carts/1234123 -> GET
cartRouter.get('/:id',getCartById);

module.exports = cartRouter;