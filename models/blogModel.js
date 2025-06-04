const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imgUrl: { type: String },
    content: { type: String, required: true },
    publishDateTime: { type: Date, required: true, default: Date.now },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const blog = mongoose.model("Blog", blogSchema);

module.exports = blog;