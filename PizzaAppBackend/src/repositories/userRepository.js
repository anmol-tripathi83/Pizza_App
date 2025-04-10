const User = require('../schema/userSchema');
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/internalServerError');

// interacting with the database(checking any user with following details which is in parameters object)
async function findUser(parameters){
    try{
        const response = await User.findOne({...parameters});
        return response;
    } catch(error){
        console.log(error);
    }
}

// interacting with the database(creating a new user with following user details which is in userDetails object)
async function createUser(userDetails){
    try{
        const response = await User.create(userDetails);
        return response; 
    } catch(error){
        if(error.name == 'ValidationError'){    // sent by mongoose(when req schema info is not given by the user or incorrect email format etc..)
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        // otherwise internalServer error
        throw new InternalServerError();   // DB se related issue
    }
}

module.exports = {
    findUser,
    createUser
};