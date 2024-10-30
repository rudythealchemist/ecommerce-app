// Import necessary components from React Router
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our E-Commerce Store
      </h1>
      <p className="text-lg mb-8">
        Discover amazing products at unbeatable prices!
      </p>
      <div className="flex space-x-4">
        {/* Link to Products Page */}
        <Link to="/products">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Shop Now
         </button>
        </Link>
        {/* Link to Shopping Cart */}
        <Link to="/cart">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
