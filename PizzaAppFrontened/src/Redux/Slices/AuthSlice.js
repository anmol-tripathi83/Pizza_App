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

// Now we call this thunk for signup which will give an asynchronous action(delayed action)
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

// Now we call this thunk for login which will give an asynchronous action(delayed action)
export const login = createAsyncThunk('/auth/login', async (data) =>{
    console.log("Incoming data to the thunk", data);
    try{
        const response = axiosInstance.post('/auth/login', data);
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

// we call this thunk when we logging out
export const logout = createAsyncThunk('/auth/logout', async () =>{
    console.log("Incoming data to the thunk");
    try{
        const response = axiosInstance.post('/auth/logout');
        toast.promise(response, {          // promise based toast(see we have removed await form above response because it handles it) 
            success: (resolvedPromise) => {
                return resolvedPromise?.data?.message;
            },
            loading: 'Logging out...',
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
    reducers: {},   // As of now we are not adding reducer yet because we have to fetch the data then we have to update the state
    extraReducers: (builder) =>{       // we write here those reducer which are coming from async thunk (builder object=> reducx will automatically pass this object)  => we have to execute these reducer when we want to update the state on the basis of thunks(these reducers are not made by default instead mede on the basis of thunk)
        builder
        .addCase(login.fulfilled, (state, action)=>{   // if login thunk successfull then kon sa reducer dalna chahte h second argument tells us
            // reducer which will execute when the login thunk is fullfilled
            state.isLoggedIn = true,
            state.role = action?.payload?.data?.data?.userRole,    // ? these are check if not have then set undefined
            state.data = action?.payload?.data?.data?.userData

            localStorage.setItem('isLoggedIn', true);              // to persist the these condn in local storage so that after machine closed(or tab closed) user remains logged in
            localStorage.setItem('role', action?.payload?.data?.data?.userRole);
            localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));
        })
        .addCase(logout.fulfilled, (state) =>{     // no need of action here
            // reducer which will execute when the logout thunk is fullfilled
            // localStorage.clear(); OR
            localStorage.setItem('isLoggedIn', false);           
            localStorage.setItem('role', '');
            localStorage.setItem('data', JSON.stringify({}));
            // also update the state value
            state.isLoggedIn = false;
            state.role = '';
            state.data = {};
        });
    }
});

export default AuthSlice.reducer;