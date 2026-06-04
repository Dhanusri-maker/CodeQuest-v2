const express = require('express');

const router = express.Router();

const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

router.get('/:category', async (req, res) => {

    try {

        const category = req.params.category;

        const model = genAI.getGenerativeModel({

            model: 'gemini-1.5-flash'

        });

        const prompt = `

Generate ONE coding question for ${category}.

Rules:

- Question should be solvable within 10 minutes
- Beginner to intermediate level
- Give only question text
- No explanation
- No answer
- No markdown

`;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        const text = response.text();

        res.json({

            question: text

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            error: 'AI question generation failed'

        });

    }

});

module.exports = router;