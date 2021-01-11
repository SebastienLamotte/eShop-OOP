const express = require('express');
const router = new express.Router();
const User = require('./../db/mongoose_models/User');
const bcrypt = require('bcrypt');
const auth = require('./../middlewares/auth')

router.get('/user', auth, (req, res) => {
    res.render('user', {
        banner: 'EDIT MY ACCOUNT',
        connected:  req.session.connected,
        user: req.session.user
    })
})

router.post('/edit-user', auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.session.user.email })
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password_current, user.password);
        
            if (!isMatch) {
                return res.send({ error: "Current password is incorrect!" })
            }

            const data = {};
            // data = {firstname, lastname, email} = req.body
            // console.log(req.body);
            // console.log(data, 'data');
            Object.entries(req.body).forEach( async entry => {
                let [key, value] = entry;
                if (value !== '') {
                    if (key !== 'password_current' && key !== 'password'){
                        data[key] = value;
                        req.session.user[key] = value
                    }
                }
            })

            if (req.body.password !== '') {
                const hashedpassword = await bcrypt.hash(req.body.password, 10);
                await User.updateOne({ _id: req.session.user._id }, {password: hashedpassword })
            }

            await User.updateOne({ _id: req.session.user._id }, data)
        } else {
            console.log("pas d'user :/")
        }
    } catch (e) {
        console.log(e);
    }
    res.send({})
})

router.post('/deleteAccount', auth, async (req, res) => {
    await User.deleteOne({ _id: req.session.user._id});
    await req.session.destroy();
    res.redirect('/login-register');
    console.log(req.session)
})



module.exports = router;