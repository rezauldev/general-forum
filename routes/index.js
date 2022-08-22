const express = require('express')
const route = express.Router()
const db = require('../config/keys').mongoURI;
const { ensureAuthenticated } = require('../config/auth')

// Load User model...
const Question = require('../models/Question')

// Welcome page...
route.get('/', async (req, res) => {
    const questions = await Question.find()
        res.render('index', {
            questions
        })

})

// ask question page submit handle...
route.post('/ask-question', (req, res) => {
    const { title, description, tags } = req.body;
    const askQuestion = new Question({
        title,
        description,
        tags
    })
    askQuestion.save()
        .then(item => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
    console.log(req.body);
})

// Dashboard page...
route.get('/dashboard', (req, res) => res.render('dashboard'))

// Ask question page...
route.get('/ask-question', (req, res) => res.render('ask-question'))

// Questions page...
route.get('/questions/:id', async (req, res) => {
    const questions = await Question.findById(req.params.id)
    res.render('questions', {
        questions
    })
    // console.log(questions.title)
})

// post answer...
route.get('/post-answer', async (req, res) => {
    res.render('post-answer')
})

module.exports = route;

