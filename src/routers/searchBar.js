const express = require('express');
const router = new express.Router();
const fs = require('fs');
const searchFolder = './templates/views';
const arrayFiles = []

router.post('/search', (req, res) => {
    if (arrayFiles.length === 0) {
        fs.readdirSync(searchFolder).forEach(file => {
            if (!req.session.connected) {
                switch (file) {
                    case 'address-payment.hbs' :
                        return;
                    case 'cart.hbs' :
                        return;
                    case 'checkout.hbs' :
                        return;
                    case 'login-register.hbs':
                        return;
                    case 'my-account.hbs':
                        return;
                    case 'user.hbs':
                        return;
                }
            }
            switch (file) {
                case '404.hbs' :
                    return;
                case 'index.hbs':
                    file = "";
                    break;
                case 'shop-detail.hbs':
                    return;
                case 'wishlist.hbs':
                    return;
            }
            arrayFiles.push(file.replace(".hbs", ""));
        });
    }
    res.send({ array: arrayFiles });
})

router.post('/found', (req, res) => {
    // res.send(req.body)
})

module.exports = router;