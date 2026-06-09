const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// helper: run docker safely
const runDocker = (cmd) => {
  return new Promise((resolve) => {
    exec(cmd, { timeout: 10000 }, (err, stdout, stderr) => {
      if (err) return resolve(stderr || err.message);
      return resolve(stdout);
    });
  });
};

router.post("/run", async (req, res) => {
  try {
    let { language, code } = req.body;

    if (!code) {
      return res.json({ output: "No code provided" });
    }

    let output = "";

    // ================= NODE JS =================
    if (language === "node" || language === "frontend" || language === "backend") {
      output = await runDocker(
        `docker run --rm node:20 node -e "${code.replace(/"/g, '\\"')}"`
      );
    }

    // ================= PYTHON =================
    else if (language === "python" || language === "ai" || language === "iot") {
      output = await runDocker(
        `docker run --rm python:3.10 python -c "${code.replace(/"/g, '\\"')}"`
      );
    }

    // ================= JAVA =================
    else if (language === "java") {
      const tempDir = path.join(__dirname, "temp");
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

      const filePath = path.join(tempDir, "Main.java");
      fs.writeFileSync(filePath, code);

      output = await runDocker(
        `docker run --rm -v ${filePath}:/app/Main.java -w /app amazoncorretto:17 javac Main.java && java Main`
      );
    }

    else {
      output = "Unsupported language";
    }

    return res.json({ output });
  } catch (err) {
    console.log("ERROR:", err.message);
    return res.status(500).json({ output: "Execution failed" });
  }
});

module.exports = router;