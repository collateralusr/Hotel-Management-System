// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// API endpoints
app.get('/api/hotels', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

app.post('/api/hotels', async (req, res) => {
  const newHotel = new Hotel(req.body);
  await newHotel.save();
  res.json(newHotel);
});

app.get('/api/hotels/:id', async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
