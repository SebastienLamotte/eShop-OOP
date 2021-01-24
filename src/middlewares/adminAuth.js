const User = require('../db/mongoose_models/User');

const adminAuth = async (req, res, next) => {
    if (!req.session.user) {
        return res.render('404', {
            connected: req.session.connected,
            banner: 'PAGE NOT FOUND'
        });
    } else {
        const user = await User.findById(req.session.user._id)
        if (!user.admin) {
            return res.render('404', {
                connected: req.session.connected,
                banner: 'PAGE NOT FOUND'
            });
        }
    }
    
    next();
}

module.exports = adminAuth;