const express = require('express')
const route = express.Router()

route.get('/', (request, response) => response.render('welcome'))

module.exports = route;