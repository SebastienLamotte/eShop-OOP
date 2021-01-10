const express = require('express');
const router = new express.Router();
const Cart = require('../db/mongoose_models/Cart');
const Product = require('../db/mongoose_models/Product');

// Send the images and the prices to the front
router.post('/getPrices&Images', async (req, res) => {
    const products = await Product.find({});
    const final = {};
    products.forEach(element => {
        const { product, price, image} = element
        final[product] = {price, image};
    });
    res.send(final);
})

// Send the user's cart depending of the db (and delete the products if the amount is 0)
router.post('/initCart', async (req, res) => {
    Object.entries(req.session.cart.articles).forEach(entry => {
        let [key, value] = entry;
        if (value === 0) {
            delete req.session.cart.articles[key];
        }
    })
    let update = req.session.cart.articles;
    await Cart.updateOne({ user: req.session.user._id }, { articles : update })
    res.send(req.session.cart)
})

// Change dynamicaly the amount of the products in the db
router.post('/changeQuant', async (req, res) => {

    let cart = await Cart.findOne({ user: req.session.user._id });
    cart.articles[req.body.article] = req.body.amount;
    req.session.cart = cart;
    let update = cart.articles;
    cart = await Cart.updateOne({ user: req.session.user._id }, { articles: update})
    res.send()
})

// Add a product to the cart in the db
router.post('/addToCart', async (req, res) => {
    let cart = await Cart.findOne({ user: req.session.user._id });
    
    cart.articles[req.body.name] = req.body.amount;
    req.session.cart = cart;
    let update = cart.articles;
    cart = await Cart.updateOne({ user: req.session.user._id }, { articles: update})

    res.send()
})

// Send the user's data (name, firstname and email);
router.post('/finalForm', (req, res) => {
    res.send(req.session.user);
})


module.exports = router;