class UserService {

    constructor(_userRepository){
        this.userRepository = _userRepository;       // object of userRepository class take as an argument and stored it in class property(used to call functions of userRepository class)
    }
    // It will create brand new user it the database
    async registerUser(userDetails){
        
        // 1. We need to check if the user with this email, mobile number already exists or not
        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });
        // If user already exists, we will throw an error
        if(user){
            throw { reason: 'User with the given email and mobile number already exist', statusCode: 400};     // client error
        }

        // 2. If not then Create the user in the database
        const newUser = await this.userRepository.createUser({       // this is sended by manually writing because let say userDetails have extra details on it but we will send only relevant details to store in the database
            email : userDetails.email,
            password : userDetails.password,
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNumber : userDetails.mobileNumber
        });
        // if user by server mistake can't be created then throw err
        if(!newUser){
            throw {reason: "Something went wrong, can't create user", StatusCode: 500};  // internal server error
        }

        // 3. return the details of created user
        return newUser;
    }
}

module.exports = UserService;