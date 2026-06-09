const express = require("express");
const axios = require("axios");

const router = express.Router();

// ================= PISTON EXECUTOR =================
const runPiston = async (language, code) => {
  try {
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: language,
      version: "*",
      files: [
        {
          content: code,
        },
      ],
    });

    return response.data.run.output;
  } catch (err) {
    return err.response?.data?.message || err.message;
  }
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
    if (language === "node" || language === "javascript") {
      output = await runPiston("javascript", code);
    }

    // ================= PYTHON =================
    else if (language === "python" || language === "ai" || language === "iot") {
      output = await runPiston("python", code);
    }

    // ================= JAVA =================
    else if (language === "java") {
      output = await runPiston("java", code);
    }

    // ================= C / CPP (optional future) =================
    else if (language === "c") {
      output = await runPiston("c", code);
    } 
    else if (language === "cpp") {
      output = await runPiston("cpp", code);
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