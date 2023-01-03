const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    answer: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    tags: {
        type: [String],
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        reference: 'User'
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question
