const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// helper: run command safely
const runCommand = (cmd, timeout = 10000) => {
  return new Promise((resolve) => {
    exec(cmd, { timeout }, (err, stdout, stderr) => {
      if (err) return resolve(stderr || err.message);
      resolve(stdout);
    });
  });
};

// ================= MAIN ROUTE =================
router.post("/run", async (req, res) => {
  try {
    let { language, code } = req.body;

    if (!code) {
      return res.json({ output: "No code provided" });
    }

    let output = "";

    // ================= NODE JS =================
    if (language === "node" || language === "frontend" || language === "backend") {
      const safeCode = code.replace(/"/g, '\\"');

      output = await runCommand(`node -e "${safeCode}"`);
    }

    // ================= PYTHON =================
    else if (language === "python" || language === "ai" || language === "iot") {
      const safeCode = code.replace(/"/g, '\\"');

      output = await runCommand(`python -c "${safeCode}"`);
    }

    // ================= JAVA =================
    else if (language === "java") {
      const tempDir = path.join(__dirname, "temp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const filePath = path.join(tempDir, "Main.java");

      fs.writeFileSync(filePath, code);

      output = await new Promise((resolve) => {
        exec(
          `cd ${tempDir} && javac Main.java && java Main`,
          { timeout: 10000 },
          (err, stdout, stderr) => {
            if (err) return resolve(stderr || err.message);
            resolve(stdout);
          }
        );
      });
    }

    // ================= UNSUPPORTED =================
    else {
      output = "Unsupported language";
    }

    return res.json({ output: output.toString() });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(500).json({ output: "Execution failed" });
  }
});

module.exports = router;