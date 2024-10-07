import { useState } from "react"; // Importing useState to manage component state
import axios from "axios"; // Importing axios for making API calls
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { toast, ToastContainer } from "react-toastify"; // Importing toast notifications
import "react-toastify/dist/ReactToastify.css"; // Importing toast styles

const Auth = () => {
  // State variables to manage form inputs and loading state
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [firstName, setFirstName] = useState(""); // State for first name
  const [lastName, setLastName] = useState(""); // State for last name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null); // State to store user info

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 6; // Example: at least 6 characters
  };

  // Function to handle user registration
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true

    // Validate email and password
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        // Assuming response.data contains user info
        const { firstName, lastName } = response.data; // Extract user info
        toast.success("Registration successful!");

        // Optionally, store user info in context or state management
        setUser({ firstName, lastName }); // Update user state (or context)

        // Clear input fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (err) {
      // Error handling logic...
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user login
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true

    try {
      // Making an API call to log in the user
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      // Use the response to check if login was successful
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in local storage
        toast.success("Login successful!"); // Show success notification
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        toast.error("Login failed. Please try again."); // Handle unexpected response structure
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed."); // Show error notification
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{isRegistering ? "Register" : "Log in"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        {/* Conditionally render the first and last name input fields only when registering */}
        {isRegistering && (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="block">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // Update first name state
                required
                className="border rounded w-full p-2"
                autoComplete="given-name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} // Update last name state
                required
                className="border rounded w-full p-2"
                autoComplete="family-name"
              />
            </div>
          </>
        )}
        {/* Email input field */}
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
            className="border rounded w-full p-2"
            autoComplete="email"
          />
        </div>
        {/* Password input field */}
        <div className="mb-4">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
            className="border rounded w-full p-2"
            autoComplete={isRegistering ? "new-password" : "current-password"} // Set autocomplete attribute based on registration state
          />
        </div>
        {/* Confirm Password input field */}
        {isRegistering && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
              required
              className="border rounded w-full p-2"
              autoComplete="new-password" // Set autocomplete attribute for confirmation password
            />
          </div>
        )}
        {/* Submit button that changes text depending on whether the user is registering or logging in */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
        </button>
      </form>
      {/* Link to toggle between login and register forms */}
      <p className="mt-4">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)} // Toggle registration state
          className="text-blue-500 underline"
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
      <p className="mt-4">
        <a href="/reset-password" className="text-blue-500 underline">
          Forgot your password?
        </a>
      </p>
      <ToastContainer /> {/* Container to render toast notifications */}
    </div>
  );
};

export default Auth;
