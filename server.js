const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv').config();
const url = process.env.MONGOLAB_URL;

const PORT = process.env.PORT || 8000;

    MongoClient.connect(url)
        .then(client => {
            console.log('Connecting to MongoDB')
            const db = client.db('general-forum')
            const usersCollection = db.collection('users')
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(express.static('public'))
            app.get('/', (request, response) => {
                response.sendFile(__dirname + '/index.html')
            })
            app.get('/signup', (request, response) => {
                response.sendFile(__dirname + '/signup.html')
            })

            app.post('/users', (request, response) => {
                usersCollection.insertOne(request.body)
                    .then(result => {
                        console.log(result)
                        response.redirect('/')
                    })
                    .catch(error => console.error(error))
            })
            app.listen(PORT, () => {
                console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
            })
        })
        .catch(error => console.error(error))



app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html')
})

app.get('/logout', (request, response) => {
    response.sendFile(__dirname + '/logout.html')
})

