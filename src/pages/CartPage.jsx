// src/pages/CartPage.jsx
import { useSelector, useDispatch } from "react-redux"; // Import necessary hooks and actions from Redux
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice"; // Import actions to manage cart
import { Link } from "react-router-dom"; // Import Link for navigation
import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import { useState } from "react"; // Import useState for managing local state

const CartPage = () => {
  const dispatch = useDispatch(); // Create dispatch function
  const cartItems = useSelector((state) => state.cart.items); // Retrieve cart items from Redux store
  const [feedback, setFeedback] = useState(""); // State to manage user feedback messages

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item)); // Dispatch action to remove item
  };

  // Function to handle clearing the entire cart
  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch action to clear the cart
  };

  // Function to handle increasing item quantity
  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item)); // Dispatch action to increase quantity
    setFeedback("Quantity increased!"); // Set feedback message
    setTimeout(() => setFeedback(""), 2000); // Clear feedback after 2 seconds
  };

  // Function to handle decreasing item quantity
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item)); // Dispatch action to decrease quantity
    setFeedback("Quantity decreased!"); // Set feedback message
    setTimeout(() => setFeedback(""), 2000); // Clear feedback after 2 seconds
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <>
          <CartItemsList
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onIncrease={handleIncreaseQuantity} // Pass the increase handler
            onDecrease={handleDecreaseQuantity} // Pass the decrease handler
          />
          <h2 className="text-xl font-bold mt-4">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </h2>
        </>
      )}

      {/* Display feedback message if it exists */}
      {feedback && <div className="mt-2 text-green-500">{feedback}</div>}

      {cartItems.length > 0 && <CartControls onClear={handleClearCart} />}
    </div>
  );
};

// Component to display a message when the cart is empty
const EmptyCartMessage = () => (
  <h3 className="text-lg font-semibold text-center">Your cart is empty.</h3>
);

// Component to list all items in the cart
const CartItemsList = ({ cartItems, onRemove, onIncrease, onDecrease }) => (
  <ul className="space-y-4">
    {cartItems.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        onRemove={onRemove}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    ))}
  </ul>
);

// Prop types for CartItemsList
CartItemsList.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired, // <-- Include image prop type
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

// Component for rendering a single item in the cart
const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => (
  <li className="cart-item flex justify-between items-center border-b pb-2 bg-gray-100 p-4 rounded-md">
    {/* Display product image */}
    
    <img
      src={item.image}
      alt={`${item.name}`}
      className="w-16 h-16 mr-4 rounded"
    />
    <div>
      <h2 className="text-lg font-semibold">{item.name}</h2>
      <p className="text-gray-600">
        ${item.price.toFixed(2)} x {item.quantity} = $
        {(item.price * item.quantity).toFixed(2)}
      </p>
      <div className="flex items-center">
        <button
          onClick={() => onDecrease(item)}
          className="button bg-yellow-300 px-2 py-1 rounded hover:bg-yellow-400"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item)}
          className="button bg-green-300 px-2 py-1 rounded hover:bg-green-400"
        >
          +
        </button>
      </div>
    </div>
    <button
      onClick={() => onRemove(item)}
      className="text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  </li>
);

// Prop types for CartItem
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, // Image prop type
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

// Component for cart controls, allowing to clear the cart and proceed to checkout
const CartControls = ({ onClear }) => (
  <div className="mt-4 flex justify-between">
    <button
      onClick={onClear}
      className="button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Clear Cart
    </button>
    <Link to="/checkout">
      <button className="button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Proceed to Checkout
      </button>
    </Link>
  </div>
);

// Prop types for CartControls
CartControls.propTypes = {
  onClear: PropTypes.func.isRequired,
};

// Export the CartPage component for use in other parts of the application
export default CartPage;
