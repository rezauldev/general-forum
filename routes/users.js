const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { ensureUserLoggedIn } = require('../config/auth')

// Load User model...
const User = require('../models/User')

// Login page...
router.get('/login', ensureUserLoggedIn, (req, res) => res.render('login'))

// Signup page...
router.get('/signup', ensureUserLoggedIn, (req, res) => res.render('signup'))

// Signup Handle...
router.post('/signup', (req, res) => {
    // console.log(request)
    const { name, email, password, confirmPassword } = req.body;
    let errors = []

    // Check required fields...
    if(!name || !email || !password || !confirmPassword){
        errors.push({ msg:'Please fill in all fields' })
    }

    const validateEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!(email.match(validateEmail))){
        errors.push({ msg:'Please fill a valid email address' })
    }

    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#,".()+_/:;<=>?{}~$%^&*])(?=.{7})/
    if(!(password.match(validatePassword))){
        errors.push({ msg:'Password should be one upper letter, one lower letter, one special character and at lest 7 characters,' })
    }



    // Check password match...
    if(password !== confirmPassword){
        errors.push({ msg:'Password do not match' })
    }

    if(errors.length > 0) {
        res.render('signup', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }else {
        // validation passed...
        User.findOne({ email: email })
            .then(user => {
                if(user){
                // User exists...
                    errors.push({ msg:'This email is already registered' })
                    res.render('signup', {
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
                            console.log(newUser.email)
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Yor are now registered and can log in')
                                    res.redirect('login');
                                    // console.log(response)
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
    // console.log(request.body)
})

// Login handle...
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ask-question',
        failureRedirect: 'login',
        failureMessage: true
    })(req, res, next);
});

// Logout handle...
router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('login')
    });

})


module.exports = router;