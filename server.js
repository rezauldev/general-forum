const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config();
const url = process.env.MONGOLAB_URL;

MongoClient.connect(url, (err, client) => {
    if (err) return connect.error(err)
    console.log('Connecting to MongoDB')
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.post('/users', (request, response) => {
    console.log(request.body)
})

app.get('/signup', (request, response) => {
    response.sendFile(__dirname + '/signup.html')
})

app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html')
})

app.get('/logout', (request, response) => {
    response.sendFile(__dirname + '/logout.html')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
})