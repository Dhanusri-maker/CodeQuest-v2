const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model

// Signup Route
router.post('/register', async (req, res) => {
    
    // Inga register logic
});

// Login Route
router.post('/login', async (req, res) => {
    // Inga login logic
});

module.exports = router;