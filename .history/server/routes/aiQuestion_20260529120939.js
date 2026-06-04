const express = require("express");

const router = express.Router();

const Question = require("../models/Question");



// GET RANDOM QUESTION

router.get("/:category", async (req, res) => {

    try {

        const { category } = req.params;

        // MongoDB fetch

        const questions = await Question.find({
            category: category
        });

        // no questions

        if (questions.length === 0) {

            return res.status(404).json({
                message: "No Questions Found"
            });

        }

        // random question

        const randomIndex =
        Math.floor(Math.random() * questions.length);

        const randomQuestion =
        questions[randomIndex];

        // send response

        res.json(randomQuestion);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


module.exports = router;