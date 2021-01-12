const express = require('express');
const router = new express.Router();
const auth = require('./../middlewares/auth');
const Address = require('./../db/mongoose_models/Address')

router.get('/address', auth, async (req, res) => {
    let address = await Address.findOne({ user: req.session.user._id })

    if (!address) {
        address = new Address({
            address: {

            },
            user: req.session.user._id
        })
    }
    console.log(address);
    res.render('address', {
        banner: 'EDIT MY ADDRESS',
        connected:  req.session.connected,
    })
})


module.exports = router