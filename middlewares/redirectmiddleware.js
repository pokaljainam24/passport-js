const redirectToblogPage = (req, res, next) => {
    if (req.url === '/') {
        return res.redirect('/home');;
    } else {
        return next();
    }
};

module.exports = redirectToblogPage;

