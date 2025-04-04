import { useState } from "react";
import toast from "react-hot-toast";
import SignupPresentation from "./SignupPresentation";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slices/AuthSlice";

// Container components for the Signup page   [container + Presentational way of writing code => good practice]
function Signup() {
    // need to make Api call, and as we know Api calls are asynchronous way of communication
    // and for that we dont have to block the UI therefore although it can be done directly using fetch or Axios 
    // but Redux toolkit provided a best to do it and the best part is that we can manage the state(for that we have dispatch the action in redux) on the basis of response coming from Api 
    // => redux Thunks(a piece of code that does some delayed work) => help to build the asynchronous action and when it finished then we update the state
    const dispatch = useDispatch();

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

    async function handleFormSubmit(e){
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

        const apiResponse = await dispatch(createAccount(signupState));
        console.log("API response is ",apiResponse);
    }

    return (
        <SignupPresentation 
            handleUserInput={handleUserInput} 
            handleFormSubmit={handleFormSubmit}
        />
    );
}



export default Signup;