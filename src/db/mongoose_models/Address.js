const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    address : {
        type: Object,
        require: true,
    },
    user : {
        type: String,
        require: true
    }
}, { minimize: false });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;