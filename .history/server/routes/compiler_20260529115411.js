const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

router.post("/run", async (req, res) => {

    try {

        const { language, code } = req.body;

        // Create temp folder
        const tempDir = path.join(__dirname, "../temp");

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // JAVA
        if (language === "java") {

            const javaFile = path.join(tempDir, "Main.java");

            fs.writeFileSync(javaFile, code);

            exec(

                `docker run --rm -v "${tempDir}:/app" eclipse-t:17 bash -c "cd /app && javac Main.java && java Main"`,

                (error, stdout, stderr) => {

                    if (error) {

                        return res.json({
                            output: stderr || error.message
                        });

                    }

                    res.json({
                        output: stdout
                    });

                }

            );

        }

        // PYTHON
        else if (language === "python") {

            const pyFile = path.join(tempDir, "main.py");

            fs.writeFileSync(pyFile, code);

            exec(

                `docker run --rm -v "${tempDir}:/app" python:3.10 bash -c "python /app/main.py"`,

                (error, stdout, stderr) => {

                    if (error) {

                        return res.json({
                            output: stderr || error.message
                        });

                    }

                    res.json({
                        output: stdout
                    });

                }

            );

        }

        else {

            res.json({
                output: "Language not supported"
            });

        }

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            output: "Code execution failed"
        });

    }

});

module.exports = router;