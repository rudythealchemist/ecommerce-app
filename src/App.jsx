import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components  
import Navbar from "./components/Navbar"; // Import navigation bar  
import HomePage from "./pages/HomePage"; // Import home page component  
import ProductsPage from "./pages/ProductsPage"; // Import products page component  
import CartPage from "./pages/CartPage"; // Import cart page component  
import CheckoutPage from "./pages/CheckoutPage"; // Import checkout page component  
import Auth from "./components/Auth"; // Import authentication component  
import LandingPage from './components/LandingPage'; // Import landing page component  
import UserProvider from './components/UserProvider'; // Import user context provider  

const App = () => {  
  return (  
    <UserProvider> {/* Wrap the application with UserProvider for global state */}  
      <Router> {/* Set up routing for the application */}  
        <Navbar /> {/* Render the navigation bar */}  
        <Routes> {/* Define application routes */}  
          <Route path="/" element={<LandingPage />} /> {/* Landing page route */}  
          <Route path="/home" element={<HomePage />} /> {/* Home page route */}  
          <Route path="/products" element={<ProductsPage />} /> {/* Products page route */}  
          <Route path="/cart" element={<CartPage />} /> {/* Cart page route */}  
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Checkout page route */}  
          <Route path="/login" element={<Auth title="Login" />} /> {/* Login page route */}  
          {/* Additional routes can be added here */}  
        </Routes>  
      </Router>  
    </UserProvider>  
  );  
};  

export default App; // Export the App component