// Function to set all the default get Routes
const routerGet = function (router, route, file, banner, userOnly=false) {
    router.get(route, (req, res) => {
        if (userOnly) {
            if (!req.session.connected) {
                return res.redirect('/login-register');
            }
        }
        res.render(file, {
            connected: req.session.connected,
            banner
        })
    })
}

module.exports = routerGet