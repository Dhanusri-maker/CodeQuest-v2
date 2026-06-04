const express = require('express');

const router = express.Router();

const axios = require('axios');

router.post('/run', async (req, res) => {

    const { code, language_id } = req.body;

    try {

        const response = await axios({

            method: 'POST',

            url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',

            headers: {

                'content-type': 'application/json',

                'X-RapidAPI-Key': process.env.RAPID_API_KEY,

                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'

            },

            data: {

                source_code: code,

                language_id: language_id

            }

        });

        console.log(response.data);

        res.json(response.data);

    }

    catch (error) {

        console.log("REAL ERROR:");

        console.log(error.response?.data || error.message);

        res.status(500).json({

            error: error.response?.data || error.message

        });

    }

});

module.exports = router;