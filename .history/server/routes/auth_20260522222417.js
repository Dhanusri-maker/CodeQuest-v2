const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model

// Signup Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findO
        // User create panrom
        const newUser = new User({ name, email, password:hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
    // Inga register logic

// Login Route
router.post('/login', async (req, res) => {
    // Inga login logic
});

module.exports = router;