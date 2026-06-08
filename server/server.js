require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// 🔥 CORS FIX (Frontend Vercel)
app.use(cors({
    origin: "https://codequest-v2.vercel.app", // உங்கள் frontend URL
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

// 🔥 DEBUG LINE (VERY IMPORTANT)
console.log("DB URI:", DB_URI);

// ❌ SAFETY CHECK
if (!DB_URI) {
    console.log("❌ ERROR: MONGO_URI is missing in .env file");
    process.exit(1);
}

// ================= MONGO CONNECT =================
mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(async () => {

    console.log("MongoDB Database Connected Successfully!");

    // ⚠️ DEBUG ONLY (remove in production later if needed)
    const User = require('./models/User');
    const users = await User.find();
    console.log("ALL USERS:", users);

    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );

})
.catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
});