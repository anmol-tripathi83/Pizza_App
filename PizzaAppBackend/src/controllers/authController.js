const { COOKIE_SECURE, FRONTEND_URL } = require("../config/serverConfig");
const { loginUser } = require("../services/authService");

async function login(req, res){
    try {
        const loginPayload = req.body;
        // Auth Service
        const response = await loginUser(loginPayload);
        
        // Now sending token from httpOnly cookie to the user to use it for further process he wants such as order placing which require token to send it for authorization
        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: COOKIE_SECURE,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 ,          // 7 days converted into msec
            domain: FRONTEND_URL  
        });
        
        return res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
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
    
    console.log("Cookies from frontend",req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: COOKIE_SECURE,    // before deploying it to production set it to true becuase in production we will be using https and not http therefore we have to set it to true
        sameSite: "lax",    // this is used to set the cookie to be sent in cross origin request
        maxAge: 7 * 24 * 60 * 60 * 1000,           // 7 days converted into msec
        domain: FRONTEND_URL       // this is used to set the cookie to be sent in cross origin request
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