import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";

// steps to make a slice in Redux

// first give the initial state of the state
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') == 'true' || false,   // IF localStorage contain the isLoggedIn status property then it is okay otherwise False
    role: localStorage.getItem('role') || '',   // IF localStorage contain role property then it is okay otherwise NULL
    data: JSON.parse(localStorage.getItem('data')) || {},   // As data is stored in key-value pair in localStorage in the form of string and we want to get in the form of object therefore we are using JSON.parse function
};

// Now we call this thunk which will give an asynchronous action
export const createAccount = createAsyncThunk('/auth/createAccount', async (data) =>{
    console.log("Incoming data to the thunk", data);
    try{
        const response = await axiosInstance.post('/users', data);
        console.log("Response from the server", response);
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