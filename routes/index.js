const express = require('express')
const route = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Load User model...
const Question = require('../models/Question')

// Welcome page...
route.get('/', (req, res) => res.render('index'))

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
            res.render('index');
        })
        .catch(err => console.log(err));
    console.log(req.body);
})

// Dashboard page...
route.get('/dashboard', (req, res) => res.render('dashboard'))

// Ask question page...
route.get('/ask-question', ensureAuthenticated, (req, res) => res.render('ask-question'))

// Questions page...
route.get('/questions', (req, res) => res.render('questions'))

module.exports = route;

