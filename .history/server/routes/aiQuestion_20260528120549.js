const express = require("express");

const router = express.Router();

const {

    GoogleGenerativeAI

} = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY

);



router.get("/:language", async (req, res) => {

    try {

        const language = req.params.language;



        const model = genAI.getGenerativeModel({

            model: "gemini-1.5-flash"

        });



        const prompt = `

Generate ONE coding question for ${language}.

Only return the question text.

Do not give answer.

`;



        const result = await model.generateContent(

            prompt

        );



        const response = await result.response;

        const text = response.text();



        res.json({

            question: text

        });

    }

    catch (error) {

        console.log(error);



        res.status(500).json({

            error: "AI question generation failed"

        });

    }

});



module.exports = router;