const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const User = require('./models/User'); // Import the User model
const authMiddleware = require('./authMiddleware'); // Import the auth middleware

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

mongoose.connect('mongodb://Admin:abc123@localhost:27017/my-auth-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body; // Include role in the request body
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 11000) {
      res.status(400).send('Username or email already exists');
    } else {
      res.status(400).send('Error registering user');
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid password');
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
  res.send({ token, role: user.role }); // Include role in the response
});

app.get('/api/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});