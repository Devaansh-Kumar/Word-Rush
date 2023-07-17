const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const router = express.Router();
const port = process.env.PORT || 3000;

router.use(express.json());
router.use(cors());

// register
async function registerUser(req, res) {
  const { name, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ error: 'Username already exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ name, username, password: hashedPassword, salt });
      const token = generateToken(newUser.username);
      res.json({ token, message: 'Registration successful', user: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// login
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = generateToken(user.username);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '30s' });
}

module.exports = {
  registerUser,
  loginUser,
};
