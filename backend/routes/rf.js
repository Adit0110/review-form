const express = require('express');
const Contact = require('../models/Rf');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, rating, review, suggession } = req.body;

    try {
        const newContact = new Contact({ name, rating, review, suggession });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

module.exports = router;
