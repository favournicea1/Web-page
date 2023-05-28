const { User } = require("../models/user");
const bcrypt = require('bcrypt')
const router = require('express').Router();


router.post("/", async(req, res) => {

    User.addUser(user, async (err, user) => {
        try{
            const {error} = validate(req.body)
            if (error) 
                return res.status(400).send({messgae: error.details[0]});
                console.log(error)
    
            const user = await User.findOne({ email: req.body.email });
            if (user)
                return res.status(409).send({ message: "User with given email already exist" })
    
            const salt = await bcrypt.genSalt(Number(process.env))
            const hashPassword = await bcrypt.hash(req.body.password, salt);
    
            await new User({ ...req.body, password: hashPassword}).save();
            res.status(201).send({ message: "User created successfully"});
            console.log('success')
            res.redirect('/')
        } catch (error) {
            res.status(500).send({ message: "Internal service error"})
        }
    });
    
});

module.exports = router;