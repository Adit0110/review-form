// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
const PORT = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rfDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define Mongoose schema and model for Contact Form
const contactSchema = new mongoose.Schema({
  name: String,
  rating: String,
  review: String,
  suggession: String
});

const Contact = mongoose.model('Rf', contactSchema);

// API endpoint to handle form submissions
app.post('/api/rf', async (req, res) => {
  try {
    const { name, rating, review, suggession } = req.body;

    // Check if an entry with the same details already exists
    const existingContact = await Contact.findOne({ name, rating, review, suggession });
    if (existingContact) {
      return res.status(400).json({ message: 'You have already submitted this form' });
    }

    // If no matching entry, create a new one
    const newContact = new Contact({ name, rating, review, suggession });
    await newContact.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});