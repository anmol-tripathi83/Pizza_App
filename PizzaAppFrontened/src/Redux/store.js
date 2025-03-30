import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";

// # Now we start the state management and React redux is used for this( Alternatives to react redux is contextApi or Zustand for state management) 

// redux maintain store which having some properties
export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: AuthSliceReducer,    // see here auth become state as auth is name in AuthSilce
    },
    devTools: true
});