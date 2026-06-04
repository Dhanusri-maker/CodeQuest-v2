const express = require("express");

const router = express.Router();

const axios = require("axios");



router.post("/run", async (req, res) => {

    try {

        const {

            language,

            code

        } = req.body;



        let pistonLanguage = language;

        let version = "*";



        if (language === "java") {

            pistonLanguage = "java";

            version = "15.0.2";

        }



        else if (language === "python") {

            pistonLanguage = "python";

            version = "3.10.0";

        }



        else {

            pistonLanguage = "javascript";

            version = "18.15.0";

        }



        const response = await axios.post(

            "https://emkc.org/api/v2/piston/execute",

            {

                language: pistonLanguage,

                version: version,



                files: [

                    {

                        name:

                            language === "java"

                                ? "Main.java"

                                : "main.py",



                        content: code

                    }

                ]

            }

        );



        res.json({

            output:

                response.data.run.output

        });

    }

    catch (error) {

        console.log(error);



        res.status(500).json({

            output: "Code execution failed"

        });

    }

});



module.exports = router;