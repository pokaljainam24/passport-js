const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { 
    type: String,
    required: true,
  }
});

// Create model
const User = mongoose.model("User", userSchema);
console.log("User Model Exported");

module.exports = User;