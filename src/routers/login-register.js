const express = require('express');
const router = new express.Router();
const User = require('../db/mongoose_models/User');
const bcrypt = require('bcrypt');
const Cart = require('../db/mongoose_models/Cart');

// Login | Registration page
router.get("/login-register", (req, res) => {
    res.render('login-register', {
        banner: 'LOGIN REGISTER',
        connected:  req.session.connected,
        reg_success: req.session.reg_success,
        reg_error: req.session.reg_error,
        log_error: req.session.log_error
    });
    delete req.session.reg_success
    delete req.session.reg_error
    delete req.session.log_error
})

// Registration form treatment
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password_reg, 10);
        const user = new User({
            firstname: req.body.firstname_reg,
            lastname: req.body.lastname_reg,
            email: req.body.email_reg,
            password: hashedPassword,
        })
        await user.save();
        // req.session.user = user;
        // delete req.session.user.password;
        // req.session.connected = true;
        req.session.reg_success = "A mail of confirmation has been sent, check your spams!";
    } catch (e) {
        req.session.reg_error = (e.code === 11000) ? "email already exists" : e;
    };
    res.redirect("/login-register");
});

// Login form treatment
router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email_log });
    if (!user) {
        req.session.log_error = "Incorrect identifiers";
        return res.redirect("/login-register");
    };

    const isMatch = await bcrypt.compare(req.body.password_log, user.password);

    if (!isMatch) {
        req.session.log_error = "Incorrect identifiers";
        return res.redirect("/login-register");
    } else {
        const {firstname, lastname, email} = user;
        req.session.user = {firstname, lastname, email}
        req.session.connected = true;
        console.log(req.session.user)

        req.session.cart = await Cart.findOne({ user: req.session.user._id });

        if (req.session.cart===null) {
            cart_session = new Cart({
                user: req.session.user._id
            });
            await cart_session.save()
            req.session.cart = cart_session
        }

        res.redirect("/shop");
    }  
})

router.get("/disconnect", async(req, res) => {
    console.log(req.session, 'session before destroy')
    await req.session.destroy();
    console.log(req.session, 'session after destroy')
    res.redirect('/login-register');
})

module.exports = router;