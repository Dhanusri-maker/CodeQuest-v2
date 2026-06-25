const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ================= REGISTER =================

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: userEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered!"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email: userEmail,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully!"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {

            return res.status(400).json({
                message: "User not found!"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid credentials!"
            });

        }

        const token = jwt.sign(
            {
                id: user._id
            },
            "mySecretKey",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful!",
            token,
            name: user.name,
            email: user.email
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;