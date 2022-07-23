const express = require('express')
const route = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Welcome page...
route.get('/', (req, res) => res.render('index'))

// Dashbored page...
route.get('/dashboard', (req, res) => res.render('dashboard', {
    name: 'rofy'
}))

module.exports = route;