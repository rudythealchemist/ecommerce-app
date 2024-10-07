import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Auth from "./components/Auth";
import LandingPage from './components/LandingPage';
import UserProvider from './components/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <Router>
        {/* Navigation bar component */}
        <Navbar />
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />
          {/* Home page route */}
          <Route path="/home" element={<HomePage />} />
          {/* Products page route */}
          <Route path="/products" element={<ProductsPage />} />
          {/* Cart page route */}
          <Route path="/cart" element={<CartPage />} />
          {/* Checkout page route */}
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Login page route */}
          <Route path="/auth" element={<Auth title="Login/Register" />} />{" "}
          {/* Setting the title alias here */}
          {/* Register page route */}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

