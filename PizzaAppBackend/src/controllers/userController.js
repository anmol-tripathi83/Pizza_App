function createUser(req, res){
    console.log("Create user: controller called");
    console.log(req.body);
    // TODO -> Register the user

    return res.json({
        message: "OK"
    });
}

// module.exports = createUser;  it is wrong becuase we have to return the function but here it is returning object
module.exports = { 
    createUser      // now it is returning function
};             