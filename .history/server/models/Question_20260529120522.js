const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,
    question:

});

module.exports = mongoose.model("Question", QuestionSchema);