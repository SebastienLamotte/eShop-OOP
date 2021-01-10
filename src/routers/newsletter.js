const express = require('express');
const Newsletter_model = require('../db/mongoose_models/Newsletter');
const router = new express.Router();

router.post('/newsletter', async (req, res) => {
    try {
        const newsletter_model = new Newsletter_model({
            email: req.body.email
        })
        await newsletter_model.save();
    } catch (e) {
        
    }
    res.redirect('back');
})


module.exports = router;