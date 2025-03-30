const blog = require('../models/blogModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");

module.exports.loginsuccess = (req, res) => {
    req.flash("success", "Login successfully..😎");
    res.redirect("/home");
}

// open home page
module.exports.openHomePage = async (req, res) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 });

        res.render("admin/blog", { blogs });
    } catch (err) {
        console.log(err.message);
    }
};

// open add blog page
module.exports.openaddBlogPage = (req, res) => {
    return res.render('admin/add-blog.ejs');
}

// post method for form on the openCreateBlogPage
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

// delete blog
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

// open edit blog page
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


// post method for edit blog page
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
    res.render("admin/loginForm");
};



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


// changepassword Page
module.exports.openchangepasswordPage = (req, res) => {
    res.render("admin/changePassword");
};


// update password
module.exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.redirect("/admin/changePassword");

        if (currentPassword !== user.password) {
            return res.redirect('/changePassword')
        }

        if (newPassword === confirmPassword) {
            req.flash("success", "password changed successfully..🤝");
            user.password = newPassword;
            await user.save();
            return res.redirect('/loginForm');
        }

    } catch (error) {
        req.flash("error", "password not matched");
        return res.redirect('/changePassword')

    }
};

// forgot page 
module.exports.openforgotPage = (req, res) => {
    return res.render("admin/forgotPass");
};

//verify email for forgot password
let otp;
module.exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {

            otp = Math.floor(100000 + Math.random() * 900000);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                    user: "pokaljainam@gmail.com",
                    pass: "eowc icwp jqho vgyx",
                },
            });


            const info = await transporter.sendMail({
                from: '"Jainam Pokal ✨" <pokaljainam@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Your Blog_Project Reset Password OTP 🔢", // Subject line
                text: "Hello world?", // plain text body
                html: `${otp}`, // html body
            });

            console.log("Message sent: %s", info.messageId);

            res.cookie("email", JSON.stringify(req.body.email), { httpOnly: false, secure: false });

            req.flash("success", "OTP sent successfully...✅");
            res.redirect("/OtpVerify");

            // return res.json({ message: `${user.username} is successfully verified..!` });
        } else {
            return res.json({ message: "User not Found..!" });
        }
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// open otp verify page
module.exports.openOtpVerifyPage = (req, res) => {
    res.render("admin/OtpVerify");
};

// verify otp for forgot password
module.exports.Verifyotp = (req, res) => {
    try {
        if (req.body.otp == otp) {
            req.flash("success", "OTP verified successfully...✅");
            return res.redirect("/resetPassword");
        } else {
            req.flash("error", "OTP not verified...❌");
            return res.redirect("/OtpVerify");
        }
    } catch (error) {
        return res.json({ message: error.message });
    }      
};

// open reset password page
module.exports.openResetPasswordPage = async (req, res) => {
    try {
        const email = req.cookies.email;

        if (!email) {
            req.flash("error", "OTP verification required.");
            return res.redirect("/OtpVerify");
        }

        res.render("admin/resetPassword", { email });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// reset password

module.exports.resetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;

        const email = JSON.parse(req.cookies.email);
        const user = await User.findOne({ email });

        if (newPassword !== confirmPassword) {
            req.flash("error", "Password not matched...❌");
            return res.redirect("/resetPassword");
        }

        user.password = newPassword;
        await user.save();

        req.flash("success", "Password reset successfully...✅");
        return res.redirect("/loginForm");

    } catch (error) {
        return res.json({ message: error.message });
    }
}


// logout

module.exports.logout = (req, res) => {
    req.logOut(() => {
        req.flash("success", "Logout successfully..❤️");
        return res.redirect("/loginForm");
    })
}