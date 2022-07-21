const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')


const app = express()

// Static file handler...
app.use(express.static('public'))


// DB config...
const db = require('./config/keys').mongoURI;
// const dotenv = require('dotenv').config();
// const db = process.env.MONGODB_URL;

// Connect to MongoDB...
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 8000;

// EJS...
app.use(expressLayouts)
app.set('view engine', 'ejs');

// Bodyparser...
app.use(express.urlencoded({ extended: true }))

// Routes...
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

    // MongoClient.connect(url)
    //     .then(client => {
    //         console.log('Connecting to MongoDB')
    //         const db = client.db('general-forum')
    //         const usersCollection = db.collection('users')
    //         app.use(bodyParser.urlencoded({extended: true}))
    //         app.use(express.static('public'))
    //         app.get('/', (request, response) => {
    //             response.sendFile(__dirname + '/index.html')
    //         })
    //         app.get('/signup', (request, response) => {
    //             response.sendFile(__dirname + '/signup.html')
    //         })
    //
    //         app.post('/users', (request, response) => {
    //             usersCollection.insertOne(request.body)
    //                 .then(result => {
    //                     response.redirect('/')
    //                 })
    //                 .catch(error => console.error(error))
    //         })
            app.listen(PORT, () => {
                console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
            })
        // })
        // .catch(error => console.error(error))



// app.get('/login', (request, response) => {
//     response.sendFile(__dirname + '/login.html')
// })
//
// app.get('/logout', (request, response) => {
//     response.sendFile(__dirname + '/logout.html')
// })

