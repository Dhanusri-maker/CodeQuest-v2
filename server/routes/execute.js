const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/java", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // Unique folder
    const id = uuidv4();
    const dirPath = path.join(__dirname, "../temp", id);

    fs.mkdirSync(dirPath, { recursive: true });

    const filePath = path.join(dirPath, "Main.java");
    fs.writeFileSync(filePath, code);

    // Compile + Run
    exec(
      `javac "${filePath}" && java -cp "${dirPath}" Main`,
      (error, stdout, stderr) => {
        // Cleanup
        fs.rmSync(dirPath, { recursive: true, force: true });

        if (error) {
          return res.json({
            success: false,
            error: stderr || error.message,
          });
        }

        return res.json({
          success: true,
          output: stdout,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;