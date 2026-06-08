const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code) {
      return res.json({ output: "No code provided" });
    }

    let lang = language;

    // map your custom names
    if (language === "frontend" || language === "backend") {
      lang = "javascript";
    }
    if (language === "ai" || language === "iot") {
      lang = "python";
    }

    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: lang,
        version: "*",
        files: [
          {
            content: code,
          },
        ],
      }
    );

    res.json({
      output:
        response.data.run?.output ||
        response.data.message ||
        "No output",
    });
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    res.status(500).json({
      output: err.response?.data?.message || "Code execution failed",
    });
  }
});

module.exports = router;