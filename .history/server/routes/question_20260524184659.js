const express = require('express');

const router = express.Router();

const Question = require('../models/Question');

router.get('/:category', async (req, res) => {

    try {

        const questions = await Question.find({
            category: req.params.category
        });

        res.json(questions);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;