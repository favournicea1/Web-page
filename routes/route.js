const express = require("express")
const router = require('express').Router()
const bcrypt = require('bcrypt')
const app = express()
const { User } = require('../models/user');
const passport = require('passport')
// const { Schema } = require("mongoose");
// const {loginAuth} = require("./auth")

console.log({User})
app.use(express.urlencoded({ extended: false}))

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/')
}


router.get("/", isLoggedIn, function(req, res) {
    res.render("./welcome.ejs")
})

router.get("/login", isLoggedOut, function(req, res) {
    res.render("./login.ejs")
})


router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
})), function (req, res) {
    console.log('Authentication Successful');
    req.flash('You are logged in')
    res.redirect('/');
}

router.get("/register", function(req, res) {
    res.render("./register.ejs")
})


router.post("/register", async(req, res) => {
    // const exists = await User.exists({ email: req.body.email})

    // if (exists) {
    //     console.log("user already exist")
    //     res.redirect("/register");
    //     return
    // }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            firstName: req.body.firstName,        
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })

        user.save();
        
        console.log(user)
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        res.redirect('/register')
    }
})




    // User(newUser, (err, user) => {
    //     if (err) {
    //         res.json({ success: false, msg: 'Failed to register user!' });
    //     } else {
    //         console.log("user registered")
    //         res.json({ success: true, msg: 'User Registered' });
    //     }
    // });

    // console.log(newUser)
    
    // res.render('./login')
        


// router.post("/register", async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//         })
//         console.log(users)
//         res.redirect('/login')
//     } catch (e) {
//         console.log(e)
//         res.redirect('/register')
//     }
// })


module.exports = router;