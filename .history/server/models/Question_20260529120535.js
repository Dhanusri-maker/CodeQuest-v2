const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,
    question:String,
    difficulty:

});

module.exports = mongoose.model("Question", QuestionSchema);