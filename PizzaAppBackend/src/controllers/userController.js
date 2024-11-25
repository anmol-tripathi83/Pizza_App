const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");

async function createUser(req, res){
    console.log("Create user: controller called");
    console.log(req.body);
    // TODO -> Register the user

    const userService = new UserService(new UserRepository());
    // console.log(userService);

    // if sccessfully created the user
    try{
        const response = await userService.registerUser(req.body);
        return res.json({
            message: "Successfully registered the user",
            success : true,
            data : response,
            error : {}
        });
    } catch(error){                   // if not created the user due to some error(server error, client error etc)
        return res.status(error.statusCode).json({
            message : error.reason,
            success : false,
            data : {},
            error : error
        });
    }
}

// module.exports = createUser;  it is wrong becuase we have to return the function but here it is returning object
module.exports = { 
    createUser      // now it is returning function
};             