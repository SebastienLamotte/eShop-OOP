const express = require('express');
const router = new express.Router();
const Newsletter = require('../db/mongoose_models/Newsletter');


router.post('/newsletter', async (req, res) => {
    try {
        console.log(req.body.email)
        const newsletter = new Newsletter({
            email: req.body.email
        })
        await newsletter.save();
        res.send({ message: "You are well registered to the newsletter!" });
    } catch (e) {
        const message = (e.code === 11000) ? "email already exists" : "Server problem, come back in a moment please!"
        res.send({ message })
    }
})


module.exports = router;