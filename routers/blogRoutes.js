const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middlewares/imageUploadmulter');
const userAuth = require('../middlewares/userAuth');
const passport = require("../middlewares/passportAuthmiddleware");

// Public Routes (No Authentication Required)
router.get('/registerForm', blogController.openSignupPage);
router.post('/registerForm', blogController.submitSignup);

router.get('/loginForm', (req, res) => {
    if (req.user) return res.redirect('/home');
    blogController.openLoginPage(req, res);
});
router.post('/loginForm', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/loginForm"
}));

// Apply Authentication Middleware
router.use(userAuth);

// Routes Accessible Only After Login
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', blogController.openHomePage);

router.get('/add-blog', blogController.openaddBlogPage);
router.post('/admin/add-blog', upload, blogController.submitBlog);

router.get('/delete/:id', blogController.deleteBlog);

router.get('/edit-blog/:id', blogController.openEditPage);
router.post('/admin/edit-blog/:id', upload, blogController.updateBlog);

router.get('/view-blog/:id', blogController.singleBlogPage);

router.get('/admin/profile',blogController.profilePage);
router.get("/logout", blogController.logout);

module.exports = router;
