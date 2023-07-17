const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());

const authController = require('./controllers/auth');
const inviteRouter = require('./routes/invite');

const PORT = process.env.PORT || 3000;

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
app.post('/register', authController.registerUser);
app.post('/login', authController.loginUser);
app.use(inviteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
