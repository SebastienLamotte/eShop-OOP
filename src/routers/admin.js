const express = require('express');
const router = new express.Router();
const User = require('../db/mongoose_models/User');
const Product = require('../db/mongoose_models/Product');
const adminAuth = require('./../middlewares/adminAuth');

router.get('/dashboard', adminAuth, async (req, res) => {
    const user = await User.findById(req.session.user._id)
    if (!user.admin) {
        return res.render('/404', {
            banner: 'PAGE NOT FOUND'
        });
    }
    
    const products = await Product.find();
    res.render('dashboard', {
        banner: "DASHBOARD",
        admin: true,
        products
    })
})


router.post('/changeProducts', adminAuth, async (req, res) => {
    const {product, price, image, _id} = req.body;
    const article = await Product.findById(_id);
    const update = {product, price, image}
    if (article && article._id) {
        console.log("cool")
        const modifiedProduct = await Product.updateOne({ _id }, update)
    }

    const newProduct = new Product(update);
    newProduct.save();
    res.send({_id: newProduct._id});
    
})

router.post('/removeProduct', adminAuth, async (req, res) => {
    await Product.findOneAndDelete( {_id: req.body._id} )
})


module.exports = router;