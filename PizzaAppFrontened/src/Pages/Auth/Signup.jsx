import { useState } from "react";
import toast from "react-hot-toast";
import SignupPresentation from "./SignupPresentation";

// Container components for the Signup page   [container + Presentational way of writing code => good practice]
function Signup() {
    const [signupState, setSignUpState] = useState({
        firstName: '',
        email: '',
        mobileNumber: '',
        password: '',
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignUpState({
            ...signupState,
            [name]: value

        });
    }

    function handleFormSubmit(e){
        e.preventDefault();  // prevent the form  from reloading the page
        console.log(signupState);

        // Add validation for the form input
        if(!signupState.email || !signupState.mobileNumber || !signupState.password || !signupState.firstName){
            toast.error("Missing values from the form");
            return;
        }

        // FirstName validation
        if(signupState.firstName.length < 5 || signupState.firstName.length > 20){
            toast.error("First name should be atleast 5 character and maximum 20 character long")
        }

        // Email Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(signupState.email)){
            toast.error("Invalid email");
        }

        // MobileNumber validation: lenght should be between 10 to 12 digit long
        if(signupState.mobileNumber.length > 12 || signupState.mobileNumber.length < 10){
            toast.error("Mobile number should be between 10-12 characters");
        }

    }

    return (
        <SignupPresentation 
            handleUserInput={handleUserInput} 
            handleFormSubmit={handleFormSubmit}
        />
    );
}

export default Signup;