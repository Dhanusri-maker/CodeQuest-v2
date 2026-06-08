const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const router = express.Router();

router.post("/run", async (req, res) => {
  console.log("RUN API HIT");

  try {
    const { language, code, input = "" } = req.body;

    console.log("LANGUAGE =", language);
    console.log("INPUT =", input);

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // ================= JAVA =================
    if (language === "java") {
      const javaFile = path.join(tempDir, "Main.java");
      fs.writeFileSync(javaFile, code);

      exec(
        `cd "${tempDir}" && javac Main.java && java Main`,
        (error, stdout, stderr) => {
          if (error) {
            return res.json({
              output: stderr || error.message,
            });
          }

          res.json({
            output: stdout,
          });
        }
      );
    }

    // ================= PYTHON =================
    else if (
      language === "python" ||
      language === "ai" ||
      language === "iot"
    ) {
      const pyFile = path.join(tempDir, "main.py");
      fs.writeFileSync(pyFile, code);

      const escapedInput = input.replace(/'/g, "'\\''");

      exec(
        `cd "${tempDir}" && echo '${escapedInput}' | python3 main.py`,
        (error, stdout, stderr) => {
          if (error) {
            return res.json({
              output: stderr || error.message,
            });
          }

          res.json({
            output: stdout,
          });
        }
      );
    }

    // ================= NODE / FRONTEND / BACKEND =================
    else if (language === "frontend" || language === "backend") {
      const jsFile = path.join(tempDir, "main.js");
      fs.writeFileSync(jsFile, code);

      exec(
        `cd "${tempDir}" && node main.js`,
        (error, stdout, stderr) => {
          if (error) {
            return res.json({
              output: stderr || error.message,
            });
          }

          res.json({
            output: stdout,
          });
        }
      );
    }

    // ================= DEFAULT =================
    else {
      res.json({
        output: "Language not supported",
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      output: "Code execution failed",
    });
  }
});

module.exports = router;