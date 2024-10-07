// src/components/Register.jsx
import  { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for registration (API call)
    console.log("Registering with:", { name, email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
