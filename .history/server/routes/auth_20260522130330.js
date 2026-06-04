

mongoose.connect(DB_URI)
    .then(() => {
        console.log("MongoDB Database Connected Successfully! 🔥");
        app.listen(PORT, () => console.log(Server running smoothly on port ${PORT}));
    })
    .catch(err => console.error("Database connection error: ", err));