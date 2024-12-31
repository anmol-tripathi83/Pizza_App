// Resource - login user
// /users

const express = require('express');
const { login } = require('../controllers/authController');

// We have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules
const authRouter = express.Router();

// localhost:5002/users -> POST
authRouter.post('/login',login);      // This is a route for login

module.exports = authRouter;           // exporting the router