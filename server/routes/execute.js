const express = require("express");
const axios = require("axios");
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

    // Call Piston API to execute Java code
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: "java",
      version: "*",
      files: [
        {
          content: code,
        },
      ],
    });

    const runResult = response.data.run;
    const output = runResult.output || runResult.stderr || runResult.stdout || "";

    if (runResult.code !== 0) {
      return res.json({
        success: false,
        error: output,
      });
    }

    return res.json({
      success: true,
      output: output,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;