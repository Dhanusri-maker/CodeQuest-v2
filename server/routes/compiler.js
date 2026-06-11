const express = require("express");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();
console.log("compiler.js loaded");

router.post("/run", async (req, res) => {
  console.log("/run API called");
  try {
    const { language, code, input } = req.body;

    if (!code) {
      return res.json({
        output: "No code provided",
      });
    }

    const tempDir = path.join(__dirname, "..", "temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    // ================= JAVA =================

    if (language === "java") {
      const filePath = path.join(tempDir, "Main.java");
      fs.writeFileSync(filePath, code);

      exec(`cd "${tempDir}" && javac Main.java`, (err) => {

        if (err) {
          return res.json({
            output: err.message,
          });
        }
        console.log("Starting java....");

        const javaProcess = spawn("java", [
          "-cp",
          tempDir,
          "Main",
        ]);

        let stdout = "";
        let stderr = "";

        javaProcess.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        javaProcess.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        if (input) {
          javaProcess.stdin.write(input + "\n");
        }

        javaProcess.stdin.end();

        javaProcess.on("close", () => {
          console.log("Java Closed");

          if (stderr) {
            return res.json({
              output: stderr,
            });
          }

          return res.json({
            output: stdout,
          });

        });

      });
    }
    // ================= PYTHON =================

    else if (language === "python") {

      const filePath = path.join(tempDir, "main.py");

      fs.writeFileSync(filePath, code);

      exec(
        `python "${filePath}"`,
        { timeout: 10000 },
        (err, stdout, stderr) => {

          if (err) {
            return res.json({
              output: stderr || err.message,
            });
          }

          return res.json({
            output: stdout,
          });

        }
      );

    }
    // ================= NODE =================

    else if (language === "node") {

      exec(
        `node -e "${code.replace(/"/g, '\\"')}"`,
        { timeout: 10000 },
        (err, stdout, stderr) => {

          if (err) {
            return res.json({
              output: stderr || err.message,
            });
          }

          return res.json({
            output: stdout,
          });

        }
      );

    }
    else {

      return res.json({
        output: "Language not supported",
      });

    }

  } catch (err) {

    return res.json({
      output: err.message,
    });

  }

});

module.exports = router;