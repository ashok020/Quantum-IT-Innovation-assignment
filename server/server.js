const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
const User = require("./models/Users");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ashok:ashok20032001@cluster0.zmvrzcr.mongodb.net/?retryWrites=true&w=majority";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "This is Private Key");
    console.log(decoded);
    // req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.use("/auth", router);

// users route
app.get("/users", isAuthenticated, async (req, res) => {
  const users = await User.find();
  res.json(users);
});
// users route
app.get("/logout", isAuthenticated, async (req, res) => {
  localStorage.removeItem("token");
});

// Database connection
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
