compiler .js


const express = require("express");
const axios = require("axios");
const router = express.Router();

console.log("compiler.js loaded (using Piston API)");

router.post("/run", async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!code) {
      return res.json({
        output: "No code provided",
      });
    }

    // Map language names if necessary (e.g., node -> javascript)
    let pistonLanguage = language;
    if (language === "node") {
      pistonLanguage = "javascript";
    }

    // Call Piston API
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: pistonLanguage,
      version: "*", // Use latest version available
      files: [
        {
          content: code
        }
      ],
      stdin: input || ""
    });

    // Extract output from Piston API response
    const runResult = response.data.run;
    const output = runResult.output || runResult.stderr || runResult.stdout || "Success (No Output)";

    return res.json({ output });

  } catch (err) {
    console.error("Compilation Error:", err.message);
    return res.json({
      output: `Server/API Error: ${err.message}`
    });
  }
});

module.exports = router;