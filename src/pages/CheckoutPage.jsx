// src/components/Checkout.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  // Select cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // State variables for the form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity; // Accumulate total price
    }, 0);
  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !address || !cardNumber || !expiryDate || !cvv) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); // Clear any previous error

    // Logic for processing the checkout (API call or payment processing)
    console.log("Processing checkout for items:", cartItems);
    console.log("Payment details:", {
      name,
      address,
      cardNumber,
      expiryDate,
      cvv,
    });

    // Clear the cart after successful checkout
    dispatch(clearCart());
    alert("Checkout successful!");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          {/* Displaying total price */}
          <h3 className="text-xl font-bold mb-4">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </h3>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="border p-2 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Complete Checkout
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout; // Export the Checkout component
