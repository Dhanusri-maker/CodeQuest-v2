const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    category

});

module.exports = mongoose.model("Question", QuestionSchema);