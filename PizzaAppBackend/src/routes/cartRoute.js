const express = require('express');
const {getCartByUser} = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

// lacalhost:5002/carts/1234123 -> GET
cartRouter.get('/',isLoggedIn, getCartByUser);

module.exports = cartRouter;