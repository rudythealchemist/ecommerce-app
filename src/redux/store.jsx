
// Import the necessary functions from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import the reducers for cart and user functionality
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

// Create the Redux store using configureStore
const store = configureStore({
  // Define the slice reducers for the store
  reducer: {
    // The 'cart' slice will use the cartReducer to manage its state
    cart: cartReducer,
    // The 'user' slice will use the userReducer to manage its state
    user: userReducer,
  },
});

// Export the store for use in the application
export default store;