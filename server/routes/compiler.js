const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/run", async (req, res) => {
  console.log("RUN API HIT");

  try {
    const { language, code } = req.body;

    console.log("LANGUAGE =", language);

    // ================= LANGUAGE MAP =================
    let pistonLang = "";

    if (language === "java") {
      pistonLang = "java";
    } 
    else if (
      language === "python" ||
      language === "ai" ||
      language === "iot"
    ) {
      pistonLang = "python";
    } 
    else if (
      language === "frontend" ||
      language === "backend"
    ) {
      pistonLang = "javascript";
    } 
    else {
      return res.json({
        output: "Language not supported"
      });
    }

    // ================= CALL PISTON API =================
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: pistonLang,
        version: "*",
        files: [
          {
            content: code
          }
        ]
      }
    );

    res.json({
      output: response.data.run.output
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      output: "Code execution failed"
    });
  }
});

module.exports = router;