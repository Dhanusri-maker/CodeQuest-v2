require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("CodeQuest Backend Running Securely with Cloud DB");
});
app.use("/api/auth', require("./routes/auth"));
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGO_URI;
mongoose.connect('mongodb://127.0.0.1:27017/CODEQUEST')
    .then(() => {
        console.log("MongoDB Database Connected Successfully!");
        app.listen(PORT, () => console.log("Server running smoothly on port 5001"));
    })
    .catch(err => {
        console.error("Database connection error: ", err);
    });