const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
}, {
    timestamps: true
});

const User_model = mongoose.model('User', userSchema);

module.exports = User_model;