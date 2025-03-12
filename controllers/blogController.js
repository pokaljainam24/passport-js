const blog = require('../models/blogModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

module.exports.openHomePage = async (req, res) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 });
        res.render("admin/blog", { blogs });
    } catch (err) {
        console.log(err.message);
    }
};

module.exports.openaddBlogPage = (req, res) => {
    return res.render('admin/add-blog.ejs');
}

//post method for form on the openCreateBlogPage
module.exports.submitBlog = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        console.log('Blog submitted successfully...');
        await blog.create({ ...req.body, imgUrl: req.file.path });
        return res.redirect('/home');

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const BlogToDelete = await blog.findById(id);
        if (!BlogToDelete) {
            return res.send("Blog not found");
        }
        await blog.findByIdAndDelete(req.params.id);
        console.log("Blog deleted successfully");
        return res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.send("Error in deleting blog");
    }
}


module.exports.openEditPage = async (req, res) => {
    const { id } = req.params;
    try {
        const blogToEdit = await blog.findById(id);
        if (!blogToEdit) {
            console.log("Blog not found with ID:", id);
            return res.status(404).send("Blog not found");
        }
        console.log("Editing blog:", blogToEdit);
        return res.render('./admin/edit-blog.ejs', { blogToEdit });
    } catch (err) {
        console.log("Error fetching blog for edit:", err);
        res.status(500).send("Error opening edit page");
    }
};


module.exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedData = { ...req.body };
        if (req.file) {
            updatedData.coverImage = req.file.filename;
        }
        await blog.findByIdAndUpdate(id, updatedData);
        return res.redirect("/home");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating blog");
    }
};


//signup and login controller

//open signup page
module.exports.openSignupPage = (req, res) => {
    res.render('./admin/registerForm.ejs');
}

//signup page post method
module.exports.submitSignup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userinDatabase = await User.findOne({ email: email });
        if (userinDatabase) {
            return res.redirect("/registerForm");
        }
        await User.create({ username, email, password });
        console.log("User signed up successfully");

        return res.redirect('/loginForm');
    } catch (err) {
        console.log(err);
        res.send("Error in submitting signup");
    }
}

//open login page
module.exports.openLoginPage = (req, res) => {
    res.render('./admin/loginForm.ejs', { errorMessage: null });
}


//open single blog 
module.exports.singleBlogPage = async (req, res) => {
    const { id } = req.params;
    try {
        const viewblog = await blog.findById(id);
        if (!viewblog) {
            console.log("Blog not found for viewing:", id);
            return res.status(404).send("Blog not found");
        }
        console.log("Displaying blog:", viewblog);
        return res.render('./admin/view-blog.ejs', { viewblog });
    } catch (err) {
        console.log("Error fetching blog:", err);
        res.status(500).send("Error opening blog page");
    }
};


// Profile Page
module.exports.profilePage = (req, res) => {
    return res.render("admin/profile"); 
}


//logout

module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/login");
    })
}