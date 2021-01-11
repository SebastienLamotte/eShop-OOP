const express = require('express');
const router = new express.Router();
const auth = require('./../middlewares/auth')

router.get('/address', auth, (req, res) => {
    res.render('address',{
        banner: 'EDIT MY ADDRESS',
        connected:  req.session.connected,
    })
})


module.exports = router