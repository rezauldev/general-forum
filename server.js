const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')


const app = express()

// Static file handler...
app.use(express.static('public'))

// Passport config...
require('./config/passport')(passport)

// DB config...
// const db = require('./config/keys').mongoURI;
const dotenv = require('dotenv').config();
const db = process.env.mongoURI;

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
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: db
    })
}))

// Passport middleware...
app.use(passport.initialize());
app.use(passport.session());

// Connect flash...
app.use(flash())

// Custom middleware(Global variables)...
app.use((req, res, next) => {
    const messages = req.session.messages;
    req.session.messages = []
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = (messages && messages?.[0]) || req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user

    console.log(res.locals.user)
    next()
})

// Routes...
app.use('/', require('./routes'))
app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
})

