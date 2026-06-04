const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,
    question:String,
    

});

module.exports = mongoose.model("Question", QuestionSchema);