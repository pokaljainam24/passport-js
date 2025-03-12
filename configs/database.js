const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DB_URL;

const db = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Database connected...');
    } catch (error) { 
        console.log('Error connecting to database:', error.message);
    }
};

module.exports = db;
