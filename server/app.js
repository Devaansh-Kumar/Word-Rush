const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
var RateLimit = require('express-rate-limit'); 
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
const authController = require('./controllers/auth');
const inviteRouter = require('./routes/invite');

// Connect to the database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

// use the routes
app.use(cors());

// middlewares to prevent DOS
const registerLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: { error: "Too many registration attempts. Please try again later." },
});

const loginLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { error: "Too many login attempts. Please try again later." },
});

app.post('/register', registerLimiter, authController.registerUser);
app.post('/login', loginLimiter, authController.loginUser);
app.use(inviteRouter);

const configureSocket = require('./socket'); 

const startServer = async () => {
  try {
    const response = await axios.get(
      "https://random-word-api.vercel.app/api?length=5"
    );
    const wordString = response.data.join("").toUpperCase();
    configureSocket(io, wordString);
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Maximum retry limit reached. Unable to fetch data.");
  }
};

startServer();
