const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model
const bcrypt = require('bcrypt');
// Signup Route
router.post('/register', async (req, res) => {
    try {
        const { name,email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser)return res.status(400).json({message:"Email already registered!"});
        // User create panrom
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({ name,email, password:hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message:"Server Error" });
    }
});
    // Inga register logic
// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.trim() }); // .trim() add pannunga
        if (!user) return res.status(400).json({ message: "User not found!" });
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {return res.status(400).json({ message: "Invalid credentials!" });
}
        const token =  jwt.sign({id:user._id},'mySecretKey',{expiresIn:'1h'});
        res.status(200).json({ message: "Login Successful!",token });
     }catch (err) {
        console.log(err)}
        res.status(500).json({ message:"Server Error" });
    }

});


module.exports = router;