import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import ProductSliceReducer from "./Slices/ProductSlice";
import CartSliceReducer from "./Slices/CartSlice";

// # Now we start the state management and React redux is used for this( Alternatives to react redux is contextApi or Zustand for state management) 

// redux maintain store which having some properties
export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: AuthSliceReducer,    // see here auth become state as auth is name in AuthSilce
        product: ProductSliceReducer,    // step-3
        cart: CartSliceReducer,
    },
    devTools: true
});