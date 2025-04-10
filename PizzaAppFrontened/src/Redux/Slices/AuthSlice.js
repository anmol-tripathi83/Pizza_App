import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

// steps to make a slice in Redux

// first give the initial state of the state
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' || false,   // IF localStorage contain the isLoggedIn status property then it is okay otherwise False
    role: localStorage.getItem('role') || '',   // IF localStorage contain role property then it is okay otherwise NULL
    data: JSON.parse(localStorage.getItem('data')) || {},   // As data is stored in key-value pair in localStorage in the form of string and we want to get in the form of object therefore we are using JSON.parse function
};

// Now we call this thunk which will give an asynchronous action(delayed action)
export const createAccount = createAsyncThunk('/auth/createAccount', async (data) =>{
    console.log("Incoming data to the thunk", data);
    try{
        const response = axiosInstance.post('/users', data);
        //one of the option=> like this if(response.data.success){ toast.success(response.data.message); } else { toast.error(response.data.message); }  other best option shown below
        toast.promise(response, {          // promise based toast(see we have removed await form above response because it handles it) 
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Hold back tight, we are registering your id... ',
            error: 'Ohh No!, Something went worng. Please try again.',
        });
        const apiResponse = await response;
        return apiResponse;
    } catch(error){
        console.log("Error in thunk", error);
    }
});

// Now start creating the Slice(initialState and reducers are in one place called Slice)
const AuthSlice = createSlice({
    name: 'auth',   //  jo iska name doge wo state ka name ban jayega
    initialState,
    reducers: {},   // As of now we are not adding reducer yet because we have to fetch fetching the data then we have to update the state
});

export default AuthSlice.reducer;