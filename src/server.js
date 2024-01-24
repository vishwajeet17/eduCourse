// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./utils/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);

// Middleware to verify JWT token for protected routes
app.use((req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
});

// Protected route example
app.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
