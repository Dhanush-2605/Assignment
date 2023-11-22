// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String, 
  age: Number,
  picture: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model('User', userSchema);
