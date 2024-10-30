import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (isRegistering && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isRegistering) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const { email, password, firstName, lastName } = formData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // TODO: Update user profile with first name and last name
    toast.success("Registration successful!");
    navigate("/login");
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );


    const user = userCredential.user;

    // Store user data in local storage
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("userEmail", user.email);
    

    // successful login redirect to dashboard
    toast.success("Login successful!");
    navigate("/home");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6text-center">
        {isRegistering ? "Register" : "Log in"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        {isRegistering && (
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4text-center">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="ml-2 text-blue-500 hover:underline"
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
      <p className="mt-4 text-center">
        <a href="/reset-password" className="text-blue-500 hover:underline">
          Forgot your password?
        </a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Auth;
