require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ CORS FIX (IMPORTANT for Vercel + Render)
app.use(cors({
    origin: "https://codequest-v2.vercel.app", // 🔴 change this
    credentials: true
}));

// ================= ROUTES =================
app.get("/", (req, res) => {
    res.send("CodeQuest Backend Running Securely with Cloud DB");
});

app.use('/api/auth', require('./routes/auth'));

const questionRoutes = require('./routes/question');
app.use('/api/questions', questionRoutes);

const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);

const aiQuestionRoutes = require('./routes/aiQuestion');
app.use('/api/ai-question', aiQuestionRoutes);

app.use('/api/compiler', require('./routes/compiler'));

// ================= DB & SERVER =================
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI;

mongoose.connect(DB_URI)
    .then(async () => {

        console.log("MongoDB Database Connected Successfully!");

        // ⚠️ (optional debug only - remove in production if needed)
        const User = require('./models/User');
        const users = await User.find();
        console.log("ALL USERS:", users);

        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        );

    })
    .catch((err) => {
        console.log("DB Connection Error:", err);
    });