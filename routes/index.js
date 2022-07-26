const express = require('express')
const route = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Welcome page...
route.get('/', (req, res) => res.render('index'))

// Dashboard page...
route.get('/dashboard', (req, res) => res.render('dashboard', {
    name: 'rofy'

}))

route.get('/ask-question', (req, res) => res.render('ask-question'))


module.exports = route;