require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= CORS (SAFE PRODUCTION FIX) =================
const allowedOrigins = [
"http://localhost:3000",
"https://code-quest-v2.vercel.app"
];

app.use(cors({
origin: function (origin, callback) {
if (!origin || allowedOrigins.includes(origin)) {
callback(null, true);
} else {
callback(new Error("CORS blocked"));
}
},
credentials: true
}));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
res.send("CodeQuest Backend Running Successfully 🚀");
});

// ================= ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/questions", require("./routes/question"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/ai-question", require("./routes/aiQuestion"));
app.use("/api/compiler", require("./routes/compiler"));

// ================= DB CONNECTION =================
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI;

console.log("DB URI Loaded:", DB_URI);

// safety check
if (!DB_URI) {
console.log("❌ MONGO_URI missing in environment variables");
process.exit(1);
}

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
