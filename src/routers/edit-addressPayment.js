const express = require('express');
const router = new express.Router();
const AddressPayment = require('../db/mongoose_models/AddressPayment');
const auth = require('../middlewares/auth')
const validator = require('validator')

router.post('/addressPayment', auth, async (req, res) => {
    try{
        const errors = []
        if (req.body.zip !== '') {
            if(!validator.isNumeric(req.body.zip)) {
                errors.push('Zip must be digits!');
            }
        }
    
        if (req.body.cardNumber !== '') {
            if(req.body.cardNumber.length < 13) {
                errors.push('Card number too short!');
            }
            if(!validator.isNumeric(req.body.cardNumber)) {
                errors.push('Card number must be digits!');
            }
        }
        if (req.body.cvv !== '') {
            if(req.body.cvv.length < 3){
                errors.push("CVV must be at least 3 digits!");
            }
            if(!validator.isNumeric(req.body.cvv)) {
                errors.push('CVV must be digits!');
            }
        }

        if (new Date(req.body.expiration).getTime() < new Date().getTime()) {
            errors.push('Invalid expiration date!')
        }

        if (errors.length === 0) {
            let addressPayment = await AddressPayment.findOne({ user: req.session.user._id })
            const update = {};
            Object.keys(req.body).forEach(key => {
                if (req.body[key] !== "") {
                    update[key] = req.body[key]
                }
            })
            if (addressPayment) {
                await AddressPayment.updateOne( { user: req.session.user._id }, update)
                res.send({ message: 'ok' })
            } else {
                update.user = req.session.user._id;
                addressPayment = new AddressPayment(update)
                await addressPayment.save()
                res.send({ message: 'ok' })
            }
        } else {
            res.send({ errors })
        }

    } catch (e) {
        console.log(e)
    }
})

router.post('/setAddressPayment', auth, async (req, res) => {
    const addressPayment = await AddressPayment.findOne({ user: req.session.user._id })
    if (addressPayment) {
        const expiration = new Date(addressPayment.expiration.getTime() + 3600*1000)
        const { address1, address2, country, zip, method, cardName, cardNumber, cvv } = addressPayment
        res.send({ address1, address2, country, zip, method, cardName, cardNumber, expiration, cvv });
    } else {
        res.send(null);
    }
})


module.exports = router