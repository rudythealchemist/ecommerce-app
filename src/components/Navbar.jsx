import { useState, useContext } from "react"; // Import necessary libraries
import { Link, useLocation } from "react-router-dom"; // React Router for navigation
import { useSelector } from "react-redux"; // Redux hook to access global state
import { FaShoppingCart } from "react-icons/fa"; // Cart icon from react-icons
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import { IoClose } from "react-icons/io5"; // Close icon
import { UserContext } from "./UserProvider"; // Import UserContext for accessing user data
import { FaUserCircle } from "react-icons/fa"; // Import user icon from react-icons  


const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accessing the user context to get user information
  const { user } = useContext(UserContext);

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Getting the current route using location hook
  const location = useLocation();

  // Function to check if the current link is active
  const isActive = (path) => location.pathname === path;

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="navbar bg-blue-600 p-4 sticky top-0 left-0 w-full z-10 flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        {/* Display user info if logged in */}
       

        {/* Links and search bar visible when the mobile menu is not open */}
        {!isMobileMenuOpen && (
          <>
            <Link
              to="/"
              className={`ml-4 p-2 rounded ${
                isActive("/") ? "bg-white text-blue-600" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`ml-4 p-2 rounded ${
                isActive("/products") ? "bg-white text-blue-600" : "text-white"
              }`}
            >
              Shop Now
            </Link>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="ml-4 p-2 rounded border border-gray-300"
            />
            <Link
              to="/auth"
              className={`ml-4 p-2 rounded ${
                isActive("/auth") ? "bg-white text-blue-600" : "text-white"
              }`}
            >
              Log In
            </Link>
            <Link
              to="/cart"
              className={`ml-4 p-2 flex items-center rounded ${
                isActive("/cart") ? "bg-blue-600 text-white" : "text-white"
              }`}
            >
              <FaShoppingCart size={24} />
              <span className="ml-1 font-bold">({cartItems.length})</span>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger menu icon for mobile responsiveness */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-white"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} // Accessibility label
      >
        {isMobileMenuOpen ? (
          <IoClose size={24} />
        ) : (
          <GiHamburgerMenu size={24} />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full bg-blue-600 flex flex-col items-center md:hidden`}
        >
          <Link
            to="/"
            className={`p-2 rounded ${
              isActive("/") ? "bg-white text-black" : "text-white"
            }`}
            onClick={toggleMobileMenu} // Close menu on click
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`p-2 rounded ${
              isActive("/products") ? "bg-white text-black" : "text-white"
            }`}
            onClick={toggleMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/auth"
            className={`p-2 rounded ${
              isActive("/auth") ? "bg-white text-black" : "text-white"
            }`}
            onClick={toggleMobileMenu}
          >
            Log In
          </Link>
          <Link
            to="/cart"
            className={`p-2 rounded ${
              isActive("/cart") ? "bg-white text-black" : "text-white"
            }`}
            onClick={toggleMobileMenu}
          >
            Cart ({cartItems.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
