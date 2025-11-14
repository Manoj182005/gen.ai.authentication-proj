import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();





// Example protected route
router.get("/home", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the protected Home Page!",
    user: req.user,
  });
});


/* -------------------- REGISTER ROUTE -------------------- */
// @route   POST /api/auth/register
// @desc    Register a new user + return JWT token
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3️⃣ Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // 4️⃣ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // 6️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 7️⃣ Send response
    res.status(201).json({
      message: "User registered successfully ✅",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in register route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* -------------------- LOGIN ROUTE -------------------- */
// @route   POST /api/auth/login
// @desc    Login user + return JWT token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Send response
    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
