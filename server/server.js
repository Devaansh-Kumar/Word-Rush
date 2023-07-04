const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a user with the provided username
    const user = await User.findOne({ username });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // User found, authentication successful
        res.json({ message: 'Login successful' });
      } else {
        // Incorrect password, authentication failed
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      // User not found, authentication failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User with the same username already exists
      res.status(409).json({ error: 'Username already exists' });
    } else {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUser = await User.create({ name, username, password: hashedPassword, salt });
      res.json({ message: 'Registration successful', user: newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
