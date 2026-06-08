const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;

    let prompt = "";

    if (category === "frontend") {
      prompt = "Generate one beginner JavaScript coding question. Only give question. No answer.";
    } 
    else if (category === "backend") {
      prompt = "Generate one beginner Node.js coding question. Only give question. No answer.";
    } 
    else if (category === "ai") {
      prompt = "Generate one beginner Python AI coding question. Only give question. No answer.";
    } 
    else if (category === "iot") {
      prompt = "Generate one beginner Python IoT coding question. Only give question. No answer.";
    } 
    else {
      prompt = `Generate ONLY ONE beginner level ${category} coding question. Only return question. No explanation.`;
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          // 🔥 IMPORTANT (OpenRouter required)
          "HTTP-Referer": "https://code-quest-v2.vercel.app",
          "X-Title": "CodeQuest"
        }
      }
    );

    const question = response.data.choices[0].message.content;

    res.json({ question });

  } catch (error) {
    console.log(error.response?.data || error);

    res.status(500).json({
      message: "AI Error"
    });
  }
});

module.exports = router;