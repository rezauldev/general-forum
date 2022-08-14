const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question