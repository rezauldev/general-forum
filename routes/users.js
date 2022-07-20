const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// User model...
const User = require('../models/User')

// Login page...
router.get('/login', (request, response) => response.render('login'))

// Signup page...
router.get('/signup', (request, response) => response.render('signup'))

// Signup Handle...
router.post('/signup', (request, response) => {
    const { name, email, password, confirmPassword } = request.body;
    let errors = []

    // Check required fields...
    if(!name || !email || !password || !confirmPassword){
        errors.push({ msg:'Please fill in all fields' })
    }

    // Check password match...
    if(password !== confirmPassword){
        errors.push({ msg:'Password do not match' })
    }

    // Check password length...
    if(password.length < 6){
        errors.push({ msg:'Password should be at least 6 characters' })
    }
    if(errors.length > 0) {
        response.render('signup', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }else {
        // validation passed...
        response.redirect('/users/login')
        User.findOne({ email: email })
            .then(user => {
                if(user){
                // User exists...
                    errors.push({ msg:'This email is already registered' })
                    response.render('signup', {
                        errors,
                        name,
                        email,
                        password,
                        confirmPassword
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            console.log(newUser)
                            newUser.save()
                                .then(user => {
                                    response.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
    // console.log(request.body)
})

// Dashboard page...
router.get('/dashboard', (request, response) => response.render('dashboard'))

module.exports = router;