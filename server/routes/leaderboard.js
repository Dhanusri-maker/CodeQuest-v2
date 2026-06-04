const express = require('express');

const router = express.Router();

const Leaderboard = require('../models/Leaderboard');



// SAVE SCORE

router.post('/add', async (req, res) => {

    try {

        console.log(req.body);

        const { username, score, category } = req.body;

        const newScore = new Leaderboard({

            username,

            score,

            category

        });

        await newScore.save();

        res.json({

            message: "Score Saved Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: "Failed to save score"

        });

    }

});



// GET ALL SCORES

router.get('/', async (req, res) => {

    try {

        const scores = await Leaderboard
            .find()
            .sort({ score: -1 });

        res.json(scores);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: "Failed to fetch leaderboard"

        });

    }

});

module.exports = router;