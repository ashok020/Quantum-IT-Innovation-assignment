const express = require("express");

const router = express.Router();

const User = require("./models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, dateOfBirth, email, password } = req.body;

    // Checking if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      dateOfBirth,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.json({ success: false, message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid Username" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: "Invalid Password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "This is Private Key", {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ message: "Server Error" });
  }
};

router.post("/register", register);
router.post("/login", login);

module.exports = router;
