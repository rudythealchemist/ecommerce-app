// src/components/ProductItem.js
import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // Import actions from the cart slice

const ProductItem = ({ product, isInCart }) => {
  // Destructure product properties from the props
  const { id, name, price, image } = product;
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Function to handle adding a product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 })); // Dispatch action to add product to cart
  };

  // Function to handle removing a product from the cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({id, name, price, image, quantity: 1})); // Dispatch action to remove product from cart
  };

  return (
    <div className="border rounded-lg p-4 m-4 shadow-md">
      {/* Display product image */}
      <img
        src={image} // Use the destructured image variable
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      {/* Display product name */}
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      {/* Display product price */}
      <p className="text-gray-700">${price.toFixed(2)}</p>

      {/* Conditionally render buttons based on whether the product is in the cart */}
      {!isInCart ? (
        <button
          onClick={handleAddToCart} // Add to cart button click handler
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-3 hover:bg-blue-600"
        >
          Add to Cart
        </button>
      ) : (
        <button
          onClick={handleRemoveFromCart} // Remove from cart button click handler
          className="bg-red-500 text-white rounded-lg px-4 py-2 mt-3 hover:bg-red-600"
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
};

// PropTypes validation for ProductItem component
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // Product ID (required)
    name: PropTypes.string.isRequired, // Product name (required)
    price: PropTypes.number.isRequired, // Product price (required)
    image: PropTypes.string.isRequired, // Product image URL (required)
  }).isRequired,
  isInCart: PropTypes.bool.isRequired, // Indicates if the product is in the cart (required)
};

export default ProductItem;
