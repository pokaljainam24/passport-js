module.exports = (req, res, next) => {
    console.log("User Auth Middleware - User:", req.user);

    if (!req.user) {
        return res.redirect('/loginForm');
    }
    next();
};
