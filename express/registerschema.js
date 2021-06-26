const mongoose = require("mongoose");
const register = mongoose.Schema({
  Fname: {
    type: String,
    required: true,
    // unique: true,
  },
  Sname: {
    type: String,
    required: true,
    // unique: true,
  },
  Email: {
    type: String,
    required: true,
    // unique: true,
  },
  Phone: {
    type: Number,
    required: true,
    // unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Confirmpass: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("register", register);
