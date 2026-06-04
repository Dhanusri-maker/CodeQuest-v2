const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,
    question:String,
    diffic

});

module.exports = mongoose.model("Question", QuestionSchema);