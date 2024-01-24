// // utils/db.js
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = mongoose.connection;

// utils/db.js
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Create different collections (if not exist)
  mongoose.connection.db.createCollection('users', (err, res) => {
    if (err) throw err;
    console.log('Users collection created');
  });

  mongoose.connection.db.createCollection('courses', (err, res) => {
    if (err) throw err;
    console.log('Courses collection created');
  });

  mongoose.connection.db.createCollection('admins', (err, res) => {
    if (err) throw err;
    console.log('Admins collection created');
  });
});

module.exports = db;
