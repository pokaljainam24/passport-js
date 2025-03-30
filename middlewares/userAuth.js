module.exports = (req, res, next) => {
    // console.log("User Auth Middleware - Authenticated:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        return res.redirect('/loginForm');
    }

    next(); 
};
