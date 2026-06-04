const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("CodeQuest Backend Running Securely with Cloud DB");
});
app.use("/api/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;
mongoose.connect(DB_URI),{useNewURIParser:true,useUnifiedTop}
    .then(() => {
        console.log("MongoDB Database Connected Successfully!");
        app.listen(PORT, () => console.log("Server running smoothly on port 5000"));
    })
    .catch(err => console.error("Database connection error: ", err));