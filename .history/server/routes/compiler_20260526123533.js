const express = require('express');

const router = express.Router();

const axios = require('axios');

router.post('/run', async (req, res) => {

    const { code, language_id } = req.body;

    try {

        const response = await axios.post(

            'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',

            {

                source_code: code,

                language_id: language_id

            },

            {

                headers: {

                    'content-type': 'application/json',

                    'X-RapidAPI-Key': '12ad65f484msh36a333477461397p12a04ajsnf8255e336973',

                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'

                }

            }

        );

        res.json(response.data);

    }

    catch (err) {
        console.log(err.response?.data || err.message);
        res.status(500).json({

            error: err.response?.data || err.message

        });

    }

});

module.exports = router;