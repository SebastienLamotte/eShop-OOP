const mongoose = require("mongoose");
const validator = require("validator");

const newsletterMemberSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const Newsletter_model = mongoose.model('NewsletterMember', newsletterMemberSchema);

module.exports = Newsletter_model;