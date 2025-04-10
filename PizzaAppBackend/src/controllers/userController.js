const { registerUser } = require("../services/userService");
const AppError = require("../utils/appError");

async function createUser(req, res){
    // console.log("Create user: controller called");
    // console.log(req.body);
    // TODO -> Register the user


    // if sccessfully created the user
    try{
        const response = await registerUser(req.body);
        return res.status(201).json({        // 201 - created
            message: "Successfully registered the user",
            success : true,
            data : response,
            error : {}
        });
    } catch(error){                   // if not created the user due to some error(server error, client error etc)
        if(error instanceof AppError){    // error from handled error
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
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