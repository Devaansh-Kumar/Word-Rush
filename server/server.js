const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load the environment variables from .env file

const app = express();
const port = 3000;

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
});

// Create a user model
const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a user with the provided username and password
    const user = await User.findOne({ username, password });

    if (user) 
    {
      // User found, authentication successful
      res.json({ message: 'Login successful' });
    } 
    else 
    {
      // User not found or incorrect password, authentication failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  try 
  {
    // We want only unique user
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User with the same username already exists
      res.status(409).json({ error: 'Username already exists' });
    } else {
      // Create a new user in the database
      const newUser = await User.create({ name, username, password });
      res.json({ message: 'Registration successful', user: newUser });
    }
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
