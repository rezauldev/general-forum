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
route.post('/ask-question', ensureAuthenticated, (req, res) => {
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
route.get('/ask-question', ensureAuthenticated, (req, res) =>  res.render('ask-question'))

// Questions page...
route.get('/questions/:id', async (req, res) => {
    const questions = await Question.findById(req.params.id)
    res.render('questions', {
        questions
    })
    // console.log(questions.title)
})

// post answer...
// we want save the answer to the collection of questions
// we want add answer of array by push to collection of document of questions
route.post('/questions/:id/post-answer', ensureAuthenticated, async (req, res) => {
    const questions = await Question.findById(req.params.id)
    questions.answer.push(req.body.answer)
    await questions.save()
    res.redirect(`/questions/${questions._id}`)
})

module.exports = route;

