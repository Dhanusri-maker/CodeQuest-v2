require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ CORS (Local + Production)
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://codequest-v2.vercel.app"
    ],
    credentials: true
}));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
    res.send("CodeQuest Backend Running Successfully 🚀");
});

// ================= ROUTES =================
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

// 🔥 Debug
console.log("DB URI Loaded:", DB_URI);

// ❌ Safety check
if (!DB_URI) {
    console.log("❌ ERROR: MONGO_URI not found in .env");
    process.exit(1);
}

// ================= MONGO CONNECT =================
mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("MongoDB Database Connected Successfully! ✅");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} 🚀`);
    });
})
.catch((err) => {
    console.log("MongoDB Connection Error ❌:", err.message);
});