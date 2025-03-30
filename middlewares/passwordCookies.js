const passwordCookies = (req, res, next) => {
    if (req.cookies.email) {
        return next();
    }
    return res.json({ message: 'Enter your email First..!' });
}

module.exports = passwordCookies;