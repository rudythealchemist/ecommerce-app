import { useState, useContext, useRef, useEffect } from "react"; // Add useRef and useEffect
import { Link, useLocation } from "react-router-dom"; // React Router for navigation
import { useSelector } from "react-redux"; // Redux hook to access global state
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Shopping cart and user icons
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon
import { IoClose } from "react-icons/io5"; // Close icon
import { UserContext } from "./UserProvider"; // Import UserContext for accessing user data
import { UserDropdown } from './user/UserDropdown';

const Navbar = ({firstName}) => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accessing the user context to get user information
  const { user } = useContext(UserContext);
  const userName = user ? user.displayName || user.email : null; // Get user's display name or email
  const userIcon = user ? user.photoURL : null; // Get user's photo URL

  // State for search input (if needed)
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

  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    setUserDropdownOpen(false);
  };

  return (
    <nav className="navbar bg-blue-600 p-4 sticky top-0 left-0 w-full z-10 flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="user-info flex items-center relative" ref={dropdownRef}>
          <div 
            className="cursor-pointer flex items-center"
            onClick={toggleUserDropdown}
          >
            <FaUserCircle className="w-8 h-8 rounded-full text-white hover:text-gray-200" />
            {userName && (
              <span className="text-white ml-2">{firstName}</span>
            )}
          </div>

          {/* Replace the old dropdown with the new UserDropdown component */}
          {isUserDropdownOpen && (
            <UserDropdown onLogout={handleLogout} />
          )}
        </div>

        <Link
          to="/login"
          className={`ml-4 p-2 rounded ${
            isActive("/login") ? "bg-white text-blue-600" : "text-white"
          }`}
        >
          Login
        </Link>

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
            {/* Shopping cart link */}
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

      {/* Hamburger menu for mobile responsiveness */}
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