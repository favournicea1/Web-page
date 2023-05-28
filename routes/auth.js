const router = require('express').Router();
const { User } = require('../models/user');
// const joi = require('joi');
const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy





    passport.use(new localStrategy ({username: 'email', password: 'password'}, function(req, username, password, done) {
        User.findById({ username: username }, function(err, user) {
            if (err) {return done(err)};
            console.log(err)
            if (!user) {return done (null, false, {message: "Incorrect Username"})}
            
            bcrypt.compare(password, newUser.password, function (err, res) {
                if (err) return done(err);
                if (res === false) return done(null, false, {message: "Incorrect Password"});
            })
    
    
            return done(null, user);
        });
    }));
    
        // passport.use(new localStrategy ({username: "email"}, {password: "password"}, 
        // authenticate))
        passport.serializeUser((user, done) => done(null, user.id))
        passport.deserializeUser((id, done) => {
            User.findById(id, function(err, user) {
                done(err, user);
            })
        })
    



module.exports = router






















// router.post("/", async (req, res) => {
//     try {
//         const { User } = validate(req.body)
//         if (error)
//             return res.status(400).send({ message: error.details[0].message});

//         const user = await User.findOne({ email: req.body.email})
//         if (!user) 
//             return res.status(401).send({ message: "Invalid Email or Password"})

//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         if (validPassword) 
//             return res.status(401).send({ message: "invalid Email or Password"});
        
//         const token = user.generateAuthToken();
//         res.status(200).send({data: token, message: "User Logged in successfully"})
//     } catch (error) {
//         res.status(500).send({ message: "Internal server error"})
//     }
// })


// const validate = (data) => {
//     const schema = joi.object({
//         email: joi.string().email().required().label("Email"),
//         password: joi.string().password().required().label("Password")
//     })
//     return schema.validate(data)
// }

// module.exports = router;