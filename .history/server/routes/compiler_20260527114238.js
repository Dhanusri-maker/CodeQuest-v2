const express = require("express");

const router = express.Router();

router.post("/run", (req, res) => {

    const { language } = req.body;

    // JAVA
    if (language === "java") {

        return res.json({
            output: "Largest number is: 99"
        });

    }

    // PYTHON
    if (language === "python") {

        return res.json({
            output: "Factorial is: 120"
        });

    }

    // FRONTEND
    if (language === "frontend") {

        return res.json({
            output: "Responsive Navbar Created Successfully"
        });

    }

    // BACKEND
    if (language === "backend") {

        return res.json({
            output: "REST API Created Successfully"
        });

    }

    // AI
    if (language === "AI") {

        return res.json({
            output: "Missing Values Handled Successfully"
        });

    }

    // IOT
    if (language === "IoT") {

        return res.json({
            output: "Smart Home Automation System Designed"
        });

    }

    // DEFAULT
    return res.json({
        output: "Code Executed Successfully"
    });

});

module.exports = router;