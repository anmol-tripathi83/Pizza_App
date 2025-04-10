const { loginUser } = require("../services/authService");

async function login(req, res){
    try {
        const loginPayload = req.body;
        // Auth Service
        const response = await loginUser(loginPayload);
        
        // Now sending token from httpOnly cookie to the user to use it for further process he wants such as order placing which require token to send it for authorization
        res.cookie("authToken", response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000           // 7 days converted into msec
        });
        
        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            data: {},
            error: {}
        });
    } catch(error){
        res.status( error.statusCode ).json({
            success: false,
            data: {},
            message: error.message,
            error: error
        });
    }
}

async function logout(req,res){
    res.cookie("authToken", "", {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000           // 7 days converted into msec
    });
    return res.status(200).json({
       success: true,
       message: "Log out successfull",
       data: {},
       error: {}
    });
}

module.exports = {
    login,
    logout
};