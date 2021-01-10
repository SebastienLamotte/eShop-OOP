const express = require('express');
const router = new express.Router();

// Function to set all the default get Routes
const router_get = (route, file, banner, userOnly=false) => {
    router.get(route, (req, res) => {
        if (userOnly) {
            if (!req.session.connected) {
                return res.redirect('/login-register');
            }
        }
        res.render(file, {
            connected: req.session.connected,
            banner
        })
    })
}

router.get('/shop', (req, res) => {
    if (!req.session.connected) {
        return res.redirect('/login-register');
    }
    res.render('shop', {
        connected: req.session.connected,
        banner: 'SHOP',
        cart: true
    })
})

// Routes that don't need modifications, just to be rendered
router_get('/', 'index');
router_get('/about', 'about', 'ABOUT US');
router_get('/cart', 'cart', 'YOUR CART', true);
router_get('/checkout', 'checkout', 'CHECK OUT', true);
router_get('/contact-us', 'contact-us', 'CONTACT US');
router_get('/gallery', 'gallery', 'GALLERY');
router_get('/shop-detail', 'shop-detail', 'DETAILS', true);
router_get('/shop', 'shop', 'SHOP', true);
router_get('/wishlist', 'wishlist', 'WISH LIST', true);
router_get('/my-account', 'my-account', 'MY ACCOUNT', true);
router_get('/*', '404', 'PAGE NOT FOUND');

module.exports = router;