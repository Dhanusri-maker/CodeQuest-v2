const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/run", async (req, res) => {

    const { code, language } = req.body;

    try {

        const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
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

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            error: "Code execution failed"
        });
    }
});

module.exports = router;