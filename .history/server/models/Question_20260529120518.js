const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,
    ques

});

module.exports = mongoose.model("Question", QuestionSchema);