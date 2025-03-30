//modules
const express = require('express');
const app = express();
const port = 7078;
const db = require('./configs/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const passport = require("./middlewares/passportAuthmiddleware");
const session = require("express-session")
const flash = require("connect-flash");


//middlewares 
app.use(session({
    secret: "jainam",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 30
    } 
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(passport.userData);
app.use(flash());
app.use(passport.flashMSG);


app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());



// ------------ middlewares ------------ //

// 1. Import index routers
const indexRouter = require('./routers/index');
app.use(indexRouter);


app.listen(port, (err) => {
    if (!err) {
        db();
        console.log(`Server is running on http://localhost:${port}`);
    }
});