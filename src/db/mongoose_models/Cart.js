const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    articles : {
        type: Object,
        require: true,
        default: {}
    },
    user : {
        type: String,
        require: true
    }
}, { minimize: false });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;