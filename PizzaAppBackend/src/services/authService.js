const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. check if there is a registered user with the given email
    const user = await findUser({ email });

    if(!user){
        throw {message: "No user found with the given email", statusCode: 404};
    }

    // 2. If the user found we need to compare plain incoming password with the hashed password saved in the DB by using compare function provided by the bcrypt
    const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidated){
        throw {message: "Invalid password, please try again", statusCode: 401};
    }

    // 3. If the password is validated, create a token and return it
    const userRole = user.role? user.role: "USER";   // for authorisation(or checking isuser is only user or admin for accessing product apis)
    const token = jwt.sign({ email: user.email, id: user._id, role: userRole}, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return token;
}

module.exports = {
    loginUser
};