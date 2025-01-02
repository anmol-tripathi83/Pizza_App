const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

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
   
   // decoded will contain the payload
   const decoded = jwt.verify(token, JWT_SECRET);
   
   // If token is tempered(not having payload) i.e invalid token 
   if(!decoded){
    return res.status(401).json({
        success: false,
        data: {},
        error: "Not authenticated",
        message: "Invalid token provided"
    });
   }

   // If reached here that means the user is authenticated allow them to access the api

   // Also set the user property in the req obj which takes the above payload in the decoded object so that at any point we want to know which user is accessing the api we can know
   req.user = {
    email: decoded.email,
    id: decoded.id
   }

   next();
}

module.exports = {
    isLoggedIn
}