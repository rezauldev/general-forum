const express = require('express')
const router = express.Router()

// Login page...
router.get('/login', (request, response) => response.render('login'))

// Signup page...
router.get('/signup', (request, response) => response.render('signup'))

// Signup Handle...
router.post('/signup', (request, response) => {
    console.log(request.body)
    response.send('hello me!')
})

// Dashboard page...
router.get('/dashboard', (request, response) => response.render('dashboard'))

module.exports = router;