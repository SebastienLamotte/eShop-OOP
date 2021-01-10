const express = require('express');
const router = new express.Router();
const Product = require('../db/mongoose_models/Product');

router.get('/product', async (req, res) => {
    Object.entries(prices).forEach(async (entry) => {
        let [product, price] = entry;

        const prod = new Product({
            product,
            price
        })
        await prod.save();
    })
    Object.entries(imgs).forEach(async entry => {
        let [product, image] = entry;
        await Product.updateOne({ product }, { image })
    })
    res.send()
})

module.exports = router;