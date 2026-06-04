const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:category", async (req, res) => {

try {

    

    
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
              "Content-Type": "application/json"
          }
      }
  );

  const question =
      response.data.choices[0].message.content;

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