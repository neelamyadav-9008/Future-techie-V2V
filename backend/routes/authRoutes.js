
const express = require("express");
const router = express.Router();

// Temporary in-memory user storage
let users = [];

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required.",
    });
  }

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      message: "This email is already registered. Please log in.",
    });
  }

  const user = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  };

  users.push(user);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  const user = users.find(
    (user) =>
      user.email === email.trim().toLowerCase() &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password. Please register first.",
    });
  }

  res.json({
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Profile
router.get("/profile", (req, res) => {
  res.json(
    users.map(({ id, name, email }) => ({ id, name, email }))
  );
});

module.exports = router;
