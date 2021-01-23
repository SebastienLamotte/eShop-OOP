const express = require('express');
const router = new express.Router();
const Product = require('../db/mongoose_models/Product');
const User = require('../db/mongoose_models/User');
const auth = require('./../middlewares/auth');

router.get('/dashboard', async (req, res) => {
    // const user = await User.findById(req.session.user._id)
    // if (!user.admin) {
    //     return res.redirect('/404');
    // }
    
    const products = await Product.find();
    res.render('dashboard', {
        banner: "DASHBOARD",
        admin: true,
        products
    })
})


router.post('/changeProducts', async (req, res) => {
    console.log(req.body)
    const {product, price, image, _id} = req.body;
    const article = Product.findById(_id);
    const update = {product, price, image}

    if (article) {
        const modifiedProduct = await Product.updateOne({ _id }, update)
        console.log(modifiedProduct)
        return res.send(modifiedProduct)
    } else {
        const newProduct = new Product(update);
        newProduct.save();
    }

    //     const prod = new Product({
    //         product,
    //         price
    //     })
    //     await prod.save();
    
    // Object.entries(imgs).forEach(async entry => {
    //     let [product, image] = entry;
    //     await Product.updateOne({ product }, { image })
    // })
})



module.exports = router;