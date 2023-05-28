const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})
// console.log(process.env.JWTPRIVATEKEY)
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this.id}.process.env.JWTPRIVATEKEY)
    return token
}


const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('firstName'),
        lastName: joi.string().required().label('lastName'),
        email: joi.string().required().label('email'),
        password: joi.string().required().label('password'),
    })
    return schema.validate(data)
}



module.exports = { User, validate }






// userSchema.statics.authenticate = function (email, password, callback) {
//     User.findOne({ email: email }).exec(function (err, user) {
//         if (err) {
//             return callback(err);
//         } else if (!user) {
//             var err = new Error('User not found.');
//             err.status = 401;
//             return callback(err);
//         }
//         bcrypt.compare(password, hash, function (err, result) {
//             if (result === true) {
//                 return callback(null, user);
//             } else {
//                 return callback();
//             }
//         });
//     });
// };

// //hashing a password before saving it to the database
// userSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });