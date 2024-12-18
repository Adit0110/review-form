const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: String, required: true },
    review: { type: String, required: true },
    suggession: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rf', contactSchema);