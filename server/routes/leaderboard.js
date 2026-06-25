const express = require("express");
const router = express.Router();

const Leaderboard = require("../models/Leaderboard");
const User = require("../models/User");

// SAVE SCORE
router.post("/add", async (req, res) => {
  try {
    const { userId, score, category } = req.body;

    // User name fetch from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const newScore = new Leaderboard({
      username: user.name,
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