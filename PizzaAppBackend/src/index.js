const express = require('express');
// Now a days body parser is pre installed in express dependencies(instead express also providing these function to totally deprecate the use of bodyparser)
const cookieParser = require("cookie-parser");         // is used to read the cookie using request body(because needed for the further process lets say after login we have to place an order therefore we have to send the token therefore token can be accessed using req object)

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middleware/multerMiddleware');
// const User = require('./schema/userSchema');     // for testing purpose

//Express object(server object)
const app = express();

app.use(cookieParser());    // this middleware helps to start reading cookies
// now due to this deserializer this project start the reading json,text and urlencoded coming in the req body 
app.use(express.json());       
app.use(express.text());
app.use(express.urlencoded({extended:true}));

// Routing middleware
// if your req routes starts with /users then handle it using userRouter 
app.use('/users', userRouter);     // connects the user router to the server
app.use('/carts',cartRouter);      // connects the cart router to the server
app.use('/auth',authRouter);      // connects the auth router to the server

// Tocheck above parser methods(json(), text() etc) works or not
app.get('/ping', isLoggedIn, (req,res)=>{
    // controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message:"pong"});
});

// For checking the functioning of multer(uploader middleware)
app.post('/photo', uploader.single('incomingFile') , (req,res) =>{
    return res.json({ message: 'Ok'});
});
      
// localhost(127.0.0.1):3000 -> socket address(IP + port)
app.listen(ServerConfig.PORT, async () =>{
    await connectDB();
    console.log(`Server is started on port ${ServerConfig.PORT}`);
    
});
