const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/run", async (req, res) => {

    const { language, code } = req.body;

    try {

        // TEMPORARY MOCK OUTPUTS

        if (language === "java") {

            if (code.includes("largest")) {

                return res.json({
                    output: "Largest number is: 99"
                });
            }

            return res.json({
                output: "Java Code Executed Successfully"
            });
        }

        if (language === "python") {

            return res.json({
                output: "Factorial is: 120"
            });
        }

        if (language === "frontend") {

            return res.json({
                output: "Navbar Created Successfully"
            });
        }

        if (language === "backend") {

            return res.json({
                output: "REST API Created Successfully"
            });
        }

        if (language === "ai") {

            return res.json({
                output: "Missing Values Handled"
            });
        }

        if (language === "iot") {

            return res.json({
                output: "Smart Home Automation Designed"
            });
        }

        res.json({
            output: "Code Executed"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Code execution failed"
        });
    }
});

module.exports = router;