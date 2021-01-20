const express = require('express');
const router = new express.Router();
const routerGet = require('../functions/router_get');

// Routes that don't need modifications, just to be rendered
routerGet(router, '/', 'index');
routerGet(router, '/about', 'about', 'ABOUT US');
routerGet(router, '/cart', 'cart', 'YOUR CART', true);
routerGet(router, '/checkout', 'checkout', 'CHECK OUT', true);
routerGet(router, '/contact-us', 'contact-us', 'CONTACT US');
routerGet(router, '/gallery', 'gallery', 'GALLERY');
routerGet(router, '/shop', 'shop', 'SHOP');
routerGet(router, '/my-account', 'my-account', 'MY ACCOUNT', true);
routerGet(router, '/found', 'found', 'SEARCH RESULTS')
routerGet(router, '/address-payment', 'address-payment','EDIT MY ADDRESS', true)
routerGet(router, '/*', '404', 'PAGE NOT FOUND');

module.exports = router;