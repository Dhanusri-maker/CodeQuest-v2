const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model
const bcrypt = require('bcrypt');
// Signup Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({email});
        if(userExists)return res.status(400).json({message:"Email already registered!"});
        // User create panrom
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({ name, email, password:hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully!" });
    } catch (err) {
        console.error("Backend Crash Error:",err);
        res.status(500).json({ error: err.message });
    }
});
    // Inga register logic
const jwt = quire('jsonwebtoken');
// Login Route
router.post('/login', async (req, res) => {
    const token =  jwt.sign({id:user._id},'mySecretKey',{expiresL}

















    )
    // Inga login logic
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.trim() }); // .trim() add pannunga
        if (!user) return res.status(400).json({ message: "User not found!" });
        
        // Password compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });
        
        res.status(200).json({ message: "Login Successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;