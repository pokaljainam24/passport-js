module.exports.logout = (req, res) => {
    req.logOut(() => {
        req.flash("success", "Logout successfully..❤️");
        return res.redirect("/loginForm");
    })
}