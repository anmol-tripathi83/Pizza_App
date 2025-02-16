const express = require('express');
const {getCartByUser, AddProductToCart} = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

// lacalhost:5002/carts/ 
cartRouter.get('/',isLoggedIn, getCartByUser);

// Add the product into the cart
cartRouter.post('/add/:productId',isLoggedIn, AddProductToCart);

module.exports = cartRouter;