const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

router.post("/run", async (req, res) => {
    console.log("RUN API HIT");

try {

    const { language, code, input = "" } = req.body;
    console.log("LANGUAGE =",language);
    console.log("INPUT =",input);
    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // JAVA
    if (language === "java") {

        const javaFile = path.join(tempDir, "Main.java");

        fs.writeFileSync(javaFile, code);

        exec(

            `docker run --rm -i -v "${tempDir}:/app" eclipse-temurin:17 bash -c "cd /app && javac Main.java && java Main"`,

            {
                input: input
            },

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

    console.log("PYTHON BLOCK START");

    const pyFile = path.join(tempDir, "main.py");

    fs.writeFileSync(pyFile, code);

    const escapedInput = input.replace(/'/g, "'\\''");

    console.log("RUNNING DOCKER...");
    console.log("INPUT =", input);

    exec(

        `docker run --rm -v "${tempDir}:/app" python:3.10 bash -c "echo '${escapedInput}' | python /app/main.py"`,

        (error, stdout, stderr) => {

            console.log("DOCKER FINISHED");
            console.log("STDOUT =", stdout);
            console.log("STDERR =", stderr);

            if (error) {

                console.log("ERROR =", error);

                return res.json({
                    output: stderr || error.message
                });

            }

            res.json({
                output: stdout
            });
            
            // FRONTEND & BACKEND
else if (
    language === "frontend" ||
    language === "backend"
) {

    const jsFile = path.join(tempDir, "main.js");

    fs.writeFileSync(jsFile, code);

    exec(

        `docker run --rm -v "${tempDir}:/app" node:20 bash -c "node /app/main.js"`,

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

// AI & IOT
else if (
    language === "ai" ||
    language === "iot"
) {

    const pyFile = path.join(tempDir, "main.py");

    fs.writeFileSync(pyFile, code);

    const escapedInput = input.replace(/'/g, "'\\''");

    exec(

        `docker run --rm -v "${tempDir}:/app" python:3.10 bash -c "echo '${escapedInput}' | python /app/main.py"`,

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