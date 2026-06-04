const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/run', async (req, res) => {

    const { code, language } = req.body;

    try {

        const response = await axios.post(
            'https://emkc.org/api/v2/piston/execute',
            {
                language: language,
                version: "*",
                files: [
                    {
                        content: code
                    }
                ]
            }
        );

        res.json(response.data);

    } catch (err) {

        console.log(err.response?.data || err.message);

        res.status(500).json({
            error: err.response?.data || err.message
        });

    }

});

module.exports = router;