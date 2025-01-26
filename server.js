// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/plantassistant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Plant Model
const Plant = mongoose.model('Plant', new mongoose.Schema({
  name: String,
  careInstructions: String,
  light: String,
  water: String,
  temperature: String,
  humidity: String,
}));

// Route to get all plants
app.get('/api/plants', async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
});

// Route to add a new plant
app.post('/api/plants', async (req, res) => {
  const newPlant = new Plant(req.body);
  await newPlant.save();
  res.status(201).json(newPlant);
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(Server running on port ${port});
});