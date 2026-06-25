const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;

    let subject = category;

    switch (category.toLowerCase()) {
      case "frontend":
        subject = "JavaScript Frontend";
        break;

      case "backend":
        subject = "Node.js Backend";
        break;

      case "ai":
        subject = "Python Artificial Intelligence";
        break;

      case "iot":
        subject = "Python Internet of Things";
        break;

      case "java":
        subject = "Java";
        break;

      case "python":
        subject = "Python";
        break;

      default:
        subject = category;
    }

    const prompt = `
Generate ONLY ONE UNIQUE beginner ${subject} coding question.

STRICT RULES:
1. Never generate "Hello World".
2. Never repeat common examples.
3. Generate a different question every request.
4. Beginner level only.
5. Return ONLY the question.
6. No answer.
7. No explanation.
8. No markdown.
9. Maximum 2 lines.
10. Do not number the question.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        temperature: 1.2,
        top_p: 0.95,
        frequency_penalty: 1,
        presence_penalty: 1,
        messages: [
          {
            role: "system",
            content:
              "You are a coding interviewer. Always generate unique coding questions."
          },
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
          "HTTP-Referer": "https://code-quest-v2.vercel.app",
          "X-Title": "CodeQuest"
        }
      }
    );

    const question =
      response.data.choices[0].message.content.trim();

    res.json({
      question
    });

  } catch (error) {
    console.log(error.response?.data || error);

    res.status(500).json({
      message: "AI Error"
    });
  }
});

module.exports = router;