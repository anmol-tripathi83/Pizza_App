// container component for login

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import LoginPresentation from "./LoginPresentation";

function Login(){
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function handleFormSubmit(e){
        e.preventDefault();  // prevent the form  from reloading the page
        console.log(loginData);

        // Add validation for the form input
        if(!loginData.email || !loginData.password){
            toast.error("Missing values from the form");
            return;
        }

        // Email Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(loginData.email)){
            toast.error("Invalid email");
        }

        const apiResponse = await dispatch(login(loginData));
        console.log("API response is ",apiResponse);
    }

    return (
        <LoginPresentation handleFormSubmit={handleFormSubmit} handleUserInput={handleUserInput} />
    );
}

export default Login;