// userController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendToken } = require("../utils/jwtToken");

const asyncHandler = require("express-async-handler");

// Register a new user
exports.register = asyncHandler(async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      password: hashedPassword,
    });

    console.log("newUser-------------------------------->", newUser);

    await newUser.save();
    sendToken(newUser, res);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login user
// Login user
exports.login = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  try {
    // Check if email is provided
    if (!req.body.email || typeof req.body.email !== "string") {
      return res
        .status(400)
        .json({ message: "Email address is required and must be a string" });
    }

    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    sendToken(user, res);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
