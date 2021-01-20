const mongoose = require("mongoose");
const validator = require('validator');

const addressPaymentSchema = new mongoose.Schema({
    address1 : {
        type: String,
        trim: true,
        maxlength: 50
    },
    address2 : {
        type: String,
        trim: true,
        maxlength: 50
    },
    country : {
        type: String,
        trim: true,
        maxlength: 50
    },
    zip : {
        type: String,
        trim: true,
        maxlength: [8, 'Zip code must have maximum 8 digits!'],
        validate(value) {
            if(!validator.isNumeric(value)) {
                throw new Error('Zip must be digits!');
            }
        }
    },
    method : {
        type: String,
        trim: true,
        enum: ['credit', 'debit', 'paypal']
    },
    cardName : {
        type: String,
        trim: true,
        maxlength: [30, "Card name too long!"]
    },
    cardNumber : {
        type: String,
        trim: true,
        minlength: [13, "Card number too short!"],
        maxlength: [19, "Card number too long!"],
        validate(value){
            if(!validator.isNumeric(value)) {
                throw new Error('Card number must be digits!');
            }
        }
    },
    expiration : {
        type: Date,
        trim: true
    },
    cvv : {
        type: String,
        trim: true,
        minlength: [3, "CVV must be at least 3 digits!"],
        maxlength: [4, "CVV must be at most 4 digits!"],
        validate(value){
            if(!validator.isNumeric(value)) {
                throw new Error('CVV must be digits!');
            }
        }
    },
    user : {
        type: String,
        unique: true,
        require: true,
    }
});

const AddressPayment = mongoose.model('AddressPayment', addressPaymentSchema);

module.exports = AddressPayment;