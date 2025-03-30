const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await userModel.findOne({ username }); 

            if (!user) {
                return done(null, false)
            }

            if (user.password !== password) {
                return done(null, false)
            }

            return done(null, user)

        } catch (err) {
            return done(err);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id);
})


passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user);
    } catch (err) {
        done(err); 
    }
})

passport.userData = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; 
    }
    next();
};

passport.flashMSG = (req, res, next) => {
    res.locals.flash = {
        success: req.flash("success"),
        error: req.flash("error"),
    }
    next();
}


module.exports = passport;