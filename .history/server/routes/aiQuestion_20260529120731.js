const express = require("express");

const Question = require(".../models/Q")
const router = express.Router();




const questions = {

    java: [

        "Find the second largest number in an array",

        "Check whether a string is palindrome",

        "Find factorial of a number",

        "Reverse an array"

    ],



    python: [

        "Find even numbers in a list",

        "Check palindrome string",

        "Find factorial using function",

        "Reverse a list"

    ],



    frontend: [

        "Create a responsive navbar",

        "Create a login form using React",

        "Design a card component",

        "Create dark mode toggle"

    ],



    backend: [

        "Create an Express API",

        "Connect MongoDB with Node.js",

        "Build login authentication",

        "Create REST API routes"

    ],



    ai: [

        "Create a chatbot logic",

        "Explain machine learning workflow",

        "Build AI recommendation logic",

        "Create sentiment analysis flow"

    ],



    iot: [

        "Blink LED using Arduino",

        "Temperature monitoring system",

        "Smart home automation",

        "IoT sensor data collection"

    ]

};



router.get("/:language", (req, res) => {

    const language = req.params.language.toLowerCase();



    const languageQuestions =

        questions[language] || [

            "Solve a simple coding problem"

        ];



    const randomQuestion =

        languageQuestions[

            Math.floor(

                Math.random() *

                languageQuestions.length

            )

        ];



    res.json({

        question: randomQuestion

    });

});



module.exports = router;