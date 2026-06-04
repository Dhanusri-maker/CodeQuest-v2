const express = require("express");

const router = express.Router();

const {

    GoogleGenerativeAI

} = require("@google/generative-ai");

require("dotenv").config();



const genAI = new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY

);



router.get("/:language", async (req, res) => {

    try {

        const language = req.params.language;



        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});



        const prompt = `Generate one simple coding question for ${language}. Only give question text.`;



        const result = await model.generateContent([prompt
        );



        const response = await result.response;

        const text = response.text();



        res.json({

            question: text

        });

    }

    catch (error) {

        console.log("AI ERROR:", error);



        res.status(500).json({

            error: "AI question failed"

        });

    }

});



module.exports = router;