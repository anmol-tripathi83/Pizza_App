const express = require('express');
const { isLoggedIn } = require('../validation/authValidator');
const { createNewOrder } = require('../controllers/orderController');

const orderRouter = express.Router();

// place the order
orderRouter.post('/',isLoggedIn , createNewOrder);

module.exports = orderRouter;