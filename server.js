const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
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