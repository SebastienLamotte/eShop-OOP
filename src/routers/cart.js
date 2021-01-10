const express = require('express');
const router = new express.Router();
const Cart = require('../db/mongoose_models/Cart');

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

router.post('/changeQuant', async (req, res) => {

    let cart = await Cart.findOne({ user: req.session.user._id });
    
    cart.articles[req.body.article] = req.body.amount;
    req.session.cart = cart;
    let update = cart.articles;
    cart = await Cart.updateOne({ user: req.session.user._id }, { articles: update})
    res.send()
})

router.post('/addToCart', async (req, res) => {
    let cart = await Cart.findOne({ user: req.session.user._id });
    
    cart.articles[req.body.name] = req.body.amount;
    req.session.cart = cart;
    let update = cart.articles;
    cart = await Cart.updateOne({ user: req.session.user._id }, { articles: update})

    res.send()
})

router.post('/deleteCart', async (req, res) => {
    // const articles = await Cart.find({ user: req.session.user._id })
})

module.exports = router;