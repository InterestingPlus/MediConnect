const mongoose = require("mongoose");

const {} = require("../");

const doctorSchema = mongoose.Schema({
  username: String,
  password: String,

  name: String,
  age: Number,
  specialization: String,
  contact: Number,
  availability: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
