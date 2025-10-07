const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';

mongoose.connect(`mongodb://${dbHost}:${dbPort}/mydb`)
  .then(() => console.log(`Connected to MongoDB at ${dbHost}:${dbPort}`))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Node.js + MongoDB!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
