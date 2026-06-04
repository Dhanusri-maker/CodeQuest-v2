const express = require('express');

const router = express.Router();

const Question = require('../models/Question');


// Get Questions by Category

router.get('q/:category', async (req, res) => {

    try {

        const category = req.params.category;

        const questions = await Question.find({
            category: category
        });

        res.status(200).json(questions);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;