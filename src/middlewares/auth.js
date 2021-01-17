const auth = (req, res, next) => {
    if (!req.session.connected) {
        return res.redirect('/login-register');
    }
    next();
}

module.exports = auth;