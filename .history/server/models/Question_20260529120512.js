const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category:String,

});

module.exports = mongoose.model("Question", QuestionSchema);