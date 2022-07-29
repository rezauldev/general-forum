const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')


const app = express()

// Static file handler...
app.use(express.static('public'))

// Passport config...
require('./config/passport')(passport)

// DB config...
const db = require('./config/keys').mongoURI;
// const dotenv = require('dotenv').config();
// const db = process.env.mongoURI;

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

// Express session...
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware...
app.use(passport.initialize());
app.use(passport.session());

// Connect flash...
app.use(flash())

// Custom middleware(Global variables)...
app.use((request, response, next) => {
    response.locals.success_msg = request.flash('success_msg')
    response.locals.error_msg = request.flash('error_msg')
    response.locals.error = request.flash('error')
    next()
})

// Routes...
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
})

