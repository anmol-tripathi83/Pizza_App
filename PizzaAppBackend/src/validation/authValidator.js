const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unauthorisedError");

// Middleware which is used to protect the route to check whether the user is loggedIn or not i.e have sended the token or not
// client -> middleware -> controller 
async function isLoggedIn(req, res, next){
   const token = req.cookies['authToken'];    // accessing the token which have been sended by httpOny cookie
   
   // If user have not sended the token 
   if(!token){
    return res.status(401).json({
        success: false,
        data: {},
        error: "Not authenticated",
        message: "No auth token provided"
    });
   }

   try{
       // decoded will contain the payload
       const decoded = jwt.verify(token, JWT_SECRET);
       if(!decoded){
        throw new UnAuthorisedError();
       }

        // If reached here that means the user is authenticated allow them to access the api
        // Also set the user property in the req obj which takes the above payload in the decoded object so that at any point we want to know which user is accessing the api we can know
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
        next();
   } catch(error){    // If token is tempered(not having payload) i.e invalid token 
       return res.status(401).json({
           success: false,
           data: {},
           error: error,
           message: "Invalid token provided"
       });
   }
}

/**
 * This function checks if the authenticated user is admin or not?
 * because we will call isadmin after isLoggedin thats why we will receive user details
 */
async function isAdmin(req,res,next){
    const loggedInUser = req.user;
    if(loggedInUser.role == "ADMIN"){
        next();
    }
    else{
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not authorised for this action",
            error: {
                statusCode: 401,
                reason: "Unauthorised user for this action"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}