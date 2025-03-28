const User = require('../schema/userSchema');

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
        console.log(error);
    }
}

module.exports = {
    findUser,
    createUser
};