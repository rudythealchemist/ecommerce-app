import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"; // Import JWT for token generation
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import nodemailer from "nodemailer"; // Import Nodemailer for sending emails
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// In-memory user storage; ideally, use a database!
const users = [];

// Secret key for JWT signing (stored in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// Set up Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  },
});

// API endpoint for registration
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // Destructure the new fields

  // Check if any fields are missing
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send({ message: "Email already registered." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with a higher cost factor
    users.push({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false, // Email verification status
    });

    // Send verification email after successful user registration
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email, // Send to the user's email
        subject: "Please verify your email",
        text: "Thank you for registering! Please verify your email.",
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).send({ message: "Internal server error." });
        }
        res.status(201).send({ message: "User registered successfully!" });
      }
    );
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).send({ message: "Internal server error." }); // Respond with error
  }
});

// API endpoint for login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body; // Destructure login credentials

  // Check for missing fields
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  // Find the user
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).send({ message: "Invalid email or password." });
  }

  // Check if the provided password matches the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: "Invalid email or password." });
  }

  // Generate JWT token
  const token = jwt.sign(
    { email: user.email, firstName: user.firstName },
    JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time
  );

  res.status(200).send({ token }); // Send the token back to the client
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 5001; // Use process.env for environment variables
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export the app for testing or other uses
