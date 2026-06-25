const express = require("express");
const router = express.Router();

const Leaderboard = require("../models/Leaderboard");
const User = require("../models/User");

// SAVE SCORE
router.post("/add", async (req, res) => {
  try {
    const { username, score, category } = req.body;

    // Already user irukkarana check pannum
    let existingUser = await Leaderboard.findOne({ username });

    if (existingUser) {
      // Score update pannum
      existingUser.score = score;
      existingUser.category = category;

      await existingUser.save();

      return res.json({
        message: "Leaderboard Updated Successfully",
      });
    }

    // New user
    const newScore = new Leaderboard({
      username,
      score,
      category,
    });

    await newScore.save();

    res.json({
      message: "Score Saved Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to save score",
    });
  }
});

// GET ALL SCORES
router.get("/", async (req, res) => {
  try {
    const scores = await Leaderboard.find().sort({ score: -1 });

    res.json(scores);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch leaderboard",
    });
  }
});

module.exports = router;