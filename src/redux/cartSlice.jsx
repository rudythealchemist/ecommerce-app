import { createSlice } from "@reduxjs/toolkit";

// Helper function: Loads cart items from local storage, handling potential errors gracefully.
const loadCartItemsFromLocalStorage = () => {
  try {
    const cartItemsJson = localStorage.getItem("cartItems"); // Retrieve cart items from localStorage
    return cartItemsJson ? JSON.parse(cartItemsJson) : []; // Parse JSON; return an empty array if no items are found.
  } catch (error) {
    console.error("Error loading cart items from local storage:", error);
    return []; // Return an empty array if there's an error during parsing.
  }
};

// Helper function: Saves cart items to local storage, handling potential errors gracefully.
const saveCartItemsToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Store cart items in localStorage as a JSON string.
  } catch (error) {
    console.error("Error saving cart items to local storage:", error); // Log any errors that occur during saving.
  }
};

// Create a slice for the shopping cart
const cartSlice = createSlice({
  name: "cart", // Unique name for this slice of the Redux store
  initialState: {
    items: loadCartItemsFromLocalStorage(), // Load cart items from local storage on initialization
  },
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload; // Destructure id and quantity from payload
      const existingItem = state.items.find((item) => item.id === id); // Check if item already exists

      if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += quantity;
      } else {
        // If the item doesn't exist, add it to the cart with the specified quantity
        state.items.push({ ...action.payload, quantity });
      }

      saveCartItemsToLocalStorage(state.items); // Save updated cart items to local storage
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id); // Filter out the item with the matching ID
      saveCartItemsToLocalStorage(state.items); // Save updated cart items to local storage
    },

    // Action to clear all items from the cart
    clearCart: (state) => {
      state.items = []; // Empty the cart
      saveCartItemsToLocalStorage(state.items); // Save the empty cart to local storage
    },

    // Action to increase the quantity of an item in the cart
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id); // Find the item by ID
      if (item) {
        item.quantity += 1; // Increase the quantity by 1
        saveCartItemsToLocalStorage(state.items); // Save updated cart items to local storage
      }
    },

    // Action to decrease the quantity of an item in the cart
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id); // Find the item by ID
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrease the quantity by 1, if greater than 1
        saveCartItemsToLocalStorage(state.items); // Save updated cart items to local storage
      }
    },
  },
});

// Export actions for use in components.
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

// Export the reducer for use in the Redux store.
export default cartSlice.reducer;
