const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot be longer than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be at least 6 characters long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

module.exports = mongoose.model('User', userSchema);