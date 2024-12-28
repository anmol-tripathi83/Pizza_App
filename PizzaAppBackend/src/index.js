const express = require('express');
// Now a days body parser is pre installed in express dependencies(instead express also providing these function to totally deprecate the use of bodyparser)

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
// const User = require('./schema/userSchema');     // for testing purpose

//Express object(server object)
const app = express();
// now due to this deserializer this project start the reading json,text and urlencoded coming in the req body 
app.use(express.json());       
app.use(express.text());
app.use(express.urlencoded({extended:true}));

// Routing middleware
// if your req routes starts with /users then handle it using userRouter 
app.use('/users', userRouter);     // connects the user router to the server
app.use('/carts',cartRouter);      // connects the cart router to the server

// Tocheck above parser methods(json(), text() etc) works or not
app.post('/ping', (req,res)=>{
    console.log(req.body);
    return res.json({message:"pong"});
});

      
// localhost(127.0.0.1):3000 -> socket address(IP + port)
app.listen(ServerConfig.PORT, async () =>{
    await connectDB();
    console.log(`Server is started on port ${ServerConfig.PORT}`);
    
});
