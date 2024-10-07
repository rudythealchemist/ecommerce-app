// src/pages/Products.js
import { useEffect, useState } from "react"; // Import necessary hooks
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import ProductItem from "../components/ProductItem"; // Import ProductItem component
import { addToCart } from "../redux/cartSlice"; // Import action for adding to cart

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Local state for products
  const [quantities, setQuantities] = useState({}); // Local state for product quantities
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux state
  const dispatch = useDispatch(); // Get the dispatch function for Redux actions

  // Function to shuffle products randomly using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Get random index
      // Swap elements
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return shuffled array
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/src/api/products.json"); // Fetch products from API
      const data = await response.json();
      const shuffledProducts = shuffleArray(data); // Shuffle products
      setProducts(shuffledProducts); // Set shuffled products into local state

      // Initialize quantities for each product to 0
      const initialQuantities = {};
      shuffledProducts.forEach((product) => {
        initialQuantities[product.id] = 0; // Default quantity
      });
      setQuantities(initialQuantities); // Update quantities state
    };

    fetchProducts(); // Call the fetch function
  }, []);

  // Function to increase the quantity of a product
  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities, // Spread the existing quantities
      [productId]: prevQuantities[productId] + 1, // Increment the specific product quantity
    }));
  };

  // Function to decrease the quantity of a product
  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0), // Ensure quantity doesn't go below zero
    }));
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = (product) => {
    if (quantities[product.id] > 0) {
      // Check if the quantity is greater than zero
      dispatch(addToCart({ ...product, quantity: quantities[product.id] })); // Dispatch add to the cart action
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 0, // Reset quantity after adding to cart
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInCart={cartItems.some((item) => item.id === product.id)} // Check if product is in cart
          quantity={quantities[product.id]} // Pass the current quantity to ProductItem
          increaseQuantity={increaseQuantity} // Function to increase quantity
          decreaseQuantity={decreaseQuantity} // Function to decrease quantity
          handleAddToCart={handleAddToCart} // Function to add to cart
        />
      ))}
    </div>
  );
};

export default ProductsPage;
